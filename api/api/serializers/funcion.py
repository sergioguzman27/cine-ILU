from rest_framework import serializers
from api.models import Funcion
from api.serializers import SalaSerializer, ButacaSerializer


class FuncionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcion
        fields = '__all__'

class FuncionDetailSerializer(serializers.ModelSerializer):
    sala = SalaSerializer()
    butacas = serializers.SerializerMethodField()

    class Meta:
        model = Funcion
        fields = '__all__'

    def get_butacas(self, obj):
        query = obj.butacas.all()
        return ButacaSerializer(query, many=True).data
