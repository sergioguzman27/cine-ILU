from django.db import models
from api.models import Sala

class Funcion(models.Model):
    """ Modelo para el contorl de las funciones del cine """

    sala = models.ForeignKey(
        Sala,
        related_name="funciones",
        on_delete=models.SET_NULL,
        null=True
    )

    pelicula_id = models.IntegerField()
    precio = models.FloatField(default=0)
    fecha_hora_inicio = models.DateTimeField()
    fecha_hora_fin = models.DateTimeField()
    activa = models.BooleanField(default=True)