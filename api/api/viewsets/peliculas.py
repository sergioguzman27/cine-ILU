import requests
import json

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.conf import settings

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

class PeliculasViewSet(viewsets.ViewSet):

    def get_permissions(self):
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
    
    def list(self, request):
        return Response({'detail': 'fadfdf'})

    def retrieve(self, request, pk=None):
        return Response({'detail': 'fadfdf'})

    @action(methods=["get"], detail=False)
    def estrenos(self, request, *args, **kwargs):
        url = settings.TMBD_HOST + '/movie/popular'
        try:
            response = requests.get(url, params={'api_key': settings.TMDB_API_KEY})
            response_body = json.loads(response.text)
            # print('respons ', response.text)
            return Response(response_body['results'], status=status.HTTP_200_OK)
        except Exception as ex:
            print("Ocurrio un error: {}".format(ex))
            return Response({'detail': 'fadfdf'}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def proximamente(self, request, *args, **kwargs):
        url = settings.TMBD_HOST + '/movie/upcoming'
        try:
            response = requests.get(url, params={'api_key': settings.TMDB_API_KEY})
            response_body = json.loads(response.text)
            # print('respons ', response.text)
            return Response(response_body['results'], status=status.HTTP_200_OK)
        except Exception as ex:
            print("Ocurrio un error: {}".format(ex))
            return Response({'detail': 'Error al obtener las peliculas'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["get"], detail=False)
    def imagenes(self, request, *args, **kwargs):
        id = request.GET.get('id', '')
        url = settings.TMBD_HOST + f'/movie/{id}/images'
        try:
            response = requests.get(url, params={'api_key': settings.TMDB_API_KEY})
            response_body = json.loads(response.text)
            # print('respons ', response.text)
            return Response(response_body, status=status.HTTP_200_OK)
        except Exception as ex:
            print("Ocurrio un error: {}".format(ex))
            return Response({'detail': 'Error al obtener las imagenes'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["get"], detail=False)
    def trailers(self, request, *args, **kwargs):
        id = request.GET.get('id', '')
        url = settings.TMBD_HOST + f'/movie/{id}/videos'
        try:
            response = requests.get(url, params={'api_key': settings.TMDB_API_KEY})
            response_body = json.loads(response.text)
            # print('respons ', response.text)
            return Response(response_body, status=status.HTTP_200_OK)
        except Exception as ex:
            print("Ocurrio un error: {}".format(ex))
            return Response({'detail': 'Error al obtener las imagenes'}, status=status.HTTP_400_BAD_REQUEST)

        

