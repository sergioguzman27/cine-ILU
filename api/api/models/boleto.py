from django.db import models
from api.models import Butaca, Compra

class Boleto(models.Model):
    """ Modelo para el control de los boletos comprados """


    compra = models.ForeignKey(
        Compra,
        related_name="boletos",
        on_delete=models.SET_NULL,
        null=True
    )
    
    butaca = models.ForeignKey(
        Butaca,
        related_name="boletos_comprados",
        on_delete=models.SET_NULL,
        null=True
    )

    
