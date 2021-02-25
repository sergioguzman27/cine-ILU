from django.db import models

class Sala(models.Model):
    """ Modelo para las salas de cine """

    nombre = models.CharField(max_length=50)
    filas = models.IntegerField()
    asientos_fila = models.IntegerField()
    asientos = models.IntegerField(default=0)
    precio_base = models.FloatField(default=0)
    activa = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
