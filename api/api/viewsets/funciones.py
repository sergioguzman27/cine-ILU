from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Funcion, Butaca
from api.serializers import FuncionSerializer, FuncionDetailSerializer


class FuncionesViewset(viewsets.ModelViewSet):
    queryset = Funcion.objects.filter(activa=True).order_by('fecha_hora_inicio', 'id')

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("sala", "precio", "fecha_hora_inicio", "fecha_hora_fin")
    search_fields = ("sala__nombre", "precio")
    ordering_fields = ("precio", "fecha_hora_inicio", "fecha_hora_fin")

    def get_serializer_class(self):
        if self.action in ['retrieve']:
            return FuncionDetailSerializer
        return FuncionSerializer

    def get_queryset(self):
        queryset = self.queryset;
        queryset = queryset.filter(fecha_hora_inicio__gte=timezone.now())
        return queryset


    def get_permissions(self):
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def list(self, request, *args, **kwargs):
        fecha_inicio = request.GET.get('fecha_inicio', None)
        fecha_fin = request.GET.get('fecha_fin', None)
        precio_min = request.GET.get('precio_min', None)
        precio_max = request.GET.get('precio_max', None)

        queryset = self.filter_queryset(self.get_queryset())

        if fecha_inicio is not None:
            queryset = queryset.filter(fecha_hora_inicio__gte=fecha_inicio)
        if fecha_fin is not None:
            queryset = queryset.filter(fecha_hora_fin__lte=fecha_fin)
        if precio_min is not None:
            queryset = queryset.filter(precio__gte=precio_min)
        if precio_max is not None:
            queryset = queryset.filter(precio__lte=precio_max)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=["put"], detail=True)
    def eliminar_fila(self, request, *args, **kwargs):
        funcion = self.get_object()

        data = request.data
        fila = data.get('fila', 0)

        butacas = Butaca.objects.filter(
            funcion=funcion,
            fila=fila
        )

        print(butacas)

        for item in butacas:
            item.estado = Butaca.NO_DISPONIBLE
            item.save()

        # butacas.update(estado=Butaca.NO_DISPONIBLE)

        return Response({'detail': 'Fila ocupada'}, status=status.HTTP_200_OK)
