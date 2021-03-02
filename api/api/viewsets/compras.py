from django.db import transaction
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Compra, Butaca, Boleto, Funcion
from api.serializers import CompraSerializer
from api.utils.generar_boletos import pdf_boletos


class ComprasViewset(viewsets.ModelViewSet):
    queryset = Compra.objects.all().order_by('id')

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("funcion",)
    search_fields = ("monto", "boletos_comprados")
    ordering_fields = ("funcion", "monto", "boletos_comprados")

    def get_serializer_class(self):
        # if self.action in ['retrieve']:
            # return FuncionDetailSerializer
        return CompraSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        data = request.data
        with transaction.atomic():
            funcion = Funcion.objects.get(id=data.get('funcion', 0))
            boletos = data.get('boletos', [])
            monto = funcion.precio * data.get('cantidad', 0)

            # Validamos la disponibilidad de los tickets
            disponibilidad = True
            for item in boletos:
                butaca = Butaca.objects.get(id=item['butaca'])
                if butaca.estado == Butaca.NO_DISPONIBLE:
                    disponibilidad = False
                    break

            if disponibilidad is False:
                return Response({'detail': 'Butacas no disponibles'}, status=status.HTTP_400_BAD_REQUEST)


            # Creamos la compra
            compra = Compra.objects.create(
                funcion=funcion,
                boletos_comprados=data.get('cantidad', 0),
                monto=monto
            )

            # Creamos los tickets y reservamos los asientos
            for item in boletos:
                butaca = Butaca.objects.get(id=item['butaca'])
                Boleto.objects.create(
                    compra=compra,
                    butaca=butaca
                )

                butaca.estado = Butaca.NO_DISPONIBLE
                butaca.save()

            # Generamos los boletos en fisico
            pdf = pdf_boletos(compra)
            
            serializer = CompraSerializer(compra)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(methods=["post"], detail=False)
    def boletos(self, request, *args, **kwargs):
        compra = Compra.objects.get(id=5)
        pdf = pdf_boletos(compra)
        return Response({}, status=status.HTTP_200_OK)