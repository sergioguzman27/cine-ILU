from rest_framework import serializers
from api.models import Comida


class ComidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comida
        fields = '__all__'