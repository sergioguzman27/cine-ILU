import json
import requests

from django.conf import settings
from rest_framework import serializers
from api.models import Funcion
from api.serializers import SalaSerializer, ButacaSerializer


class FuncionSerializer(serializers.ModelSerializer):
    pelicula = serializers.SerializerMethodField()
    sala = SalaSerializer()
    class Meta:
        model = Funcion
        fields = '__all__'

    def get_pelicula(self, obj):
        url = settings.TMBD_HOST + f'/movie/{obj.pelicula_id}'
        try:
            response = requests.get(url, params={'api_key': settings.TMDB_API_KEY})
            response_body = json.loads(response.text)
            return response_body
        except Exception as ex:
            return None


class FuncionDetailSerializer(serializers.ModelSerializer):
    sala = SalaSerializer()
    butacas = serializers.SerializerMethodField()
    pelicula = serializers.SerializerMethodField()


    class Meta:
        model = Funcion
        fields = '__all__'

    def get_butacas(self, obj):
        query = obj.butacas.all()
        return ButacaSerializer(query, many=True).data

    def get_pelicula(self, obj):
        url = settings.TMBD_HOST + f'/movie/{obj.pelicula_id}'
        try:
            response = requests.get(url, params={'api_key': settings.TMDB_API_KEY})
            response_body = json.loads(response.text)
            return response_body
        except Exception as ex:
            return None
