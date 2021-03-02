from django.db import models
from api.models import Funcion

class Compra(models.Model):
    """ Modelo para guardar las compras de boletos """

    funcion = models.ForeignKey(
        Funcion,
        related_name="compras",
        on_delete=models.SET_NULL,
        null=True
    )

    boletos_comprados = models.IntegerField()
    monto = models.FloatField()

    tickets = models.FileField(upload_to='boletos', null=True)
