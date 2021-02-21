import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Test
from api.serializers import TestSerializer


class TestViewset(viewsets.ModelViewSet):
    queryset = Test.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)

    def get_serializer_class(self):
        return TestSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]