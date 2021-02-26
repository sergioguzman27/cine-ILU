from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Funcion
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

    def get_permissions(self):
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)

    # @action(methods=["get"], detail=False)
    # def proximamente(self, request, *args, **kwargs):