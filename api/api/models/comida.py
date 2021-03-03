from django.db import models

class Comida(models.Model):
    """ Modelo para el control de los snaks y combos del cine """

    nombre = models.CharField(max_length=250)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='comida', null=True)
    precio = models.FloatField(default=0)
    activo = models.BooleanField(default=True)