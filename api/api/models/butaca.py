from django.db import models
from api.models import Funcion

class Butaca(models.Model):
    """ Modelo para el control de los asientos de un cine """

    DISPONIBLE = 1
    NO_DISPONIBLE = 5

    ESTADOS = (
        (DISPONIBLE, 'Disponible'),
        (NO_DISPONIBLE, 'No disponible'),
    )

    funcion = models.ForeignKey(
        Funcion,
        related_name="butacas",
        on_delete=models.SET_NULL,
        null=True
    )

    fila = models.IntegerField()
    numero_asiento = models.IntegerField()
    estado = models.IntegerField(choices=ESTADOS, default=DISPONIBLE)

