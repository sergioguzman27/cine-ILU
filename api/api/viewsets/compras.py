from django.db import transaction
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Compra, Butaca, Boleto, Funcion, Comida, BoletoComida
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
            dulceria = data.get('dulceria', [])
            monto_boletos = funcion.precio * data.get('cantidad', 0)
            monto_comida = data.get('monto_comida', 0)

            # Validamos la disponibilidad de los tickets
            if len(boletos) == 0:
                return Response({'detail': 'Compra al menos un boleto'}, status=status.HTTP_400_BAD_REQUEST)
            
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
                monto_boletos=monto_boletos,
                monto_comida=monto_comida,
                monto=monto_boletos+monto_comida
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

            # Creamos tickets para dulceria
            for item in dulceria:
                comida = Comida.objects.get(id=item['comida'])
                BoletoComida.objects.create(
                    compra=compra,
                    comida=comida,
                    cantidad=item['cantidad']
                )

            # Generamos los boletos (funcion y comida) en fisico
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