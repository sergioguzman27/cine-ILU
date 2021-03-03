from django.db import models
from api.models import Comida, Compra

class BoletoComida(models.Model):
    """ Modelo para el control de las compras de comida """

    compra = models.ForeignKey(
        Compra,
        related_name="boletos_comida",
        on_delete=models.SET_NULL,
        null=True
    )
    
    comida = models.ForeignKey(
        Comida,
        related_name="compras",
        on_delete=models.SET_NULL,
        null=True
    )
