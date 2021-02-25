from rest_framework import serializers
from api.models import Butaca


class ButacaSerializer(serializers.ModelSerializer):
    
    estado__text = serializers.ReadOnlyField(source='get_estado_display')
    class Meta:
        model = Butaca
        fields = '__all__'
