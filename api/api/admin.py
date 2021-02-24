from django.contrib import admin
from api.models import Sala, Funcion

# Register your models here.
@admin.register(Sala)
class SalaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'filas', 'asientos', 'precio_base', 'activa')

@admin.register(Funcion)
class FuncionAdmin(admin.ModelAdmin):
    list_display = ('sala', 'pelicula_id', 'precio', 'fecha', 'hora_inicio', 'hora_fin', 'activa')
