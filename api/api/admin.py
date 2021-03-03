from django.contrib import admin
from api.models import Sala, Funcion, Butaca, Comida

# Register your models here.
@admin.register(Sala)
class SalaAdmin(admin.ModelAdmin):
    fields = ('nombre', 'filas', 'asientos_fila', 'precio_base', 'activa')
    list_display = ('id', 'nombre', 'asientos', 'precio_base', 'activa')
    
    def response_add(self, request, obj, post_url_continue=None):
        obj.asientos = obj.filas * obj.asientos_fila
        obj.save()
        return super().response_add(request, obj, post_url_continue)


@admin.register(Funcion)
class FuncionAdmin(admin.ModelAdmin):
    fields = ('sala', 'pelicula_id', 'precio', 'fecha_hora_inicio', 'fecha_hora_fin')
    list_display = ('id', 'sala', 'pelicula_id', 'precio', 'fecha_hora_inicio', 'fecha_hora_fin', 'activa')

    def response_add(self, request, obj, post_url_continue=None):
        filas = obj.sala.filas
        columnas = obj.sala.asientos_fila

        for i in range(0, filas):
            for j in range(0, columnas):
                Butaca.objects.create(
                    funcion=obj,
                    fila=i,
                    numero_asiento=j+1
                )
        obj.save()
        return super().response_add(request, obj, post_url_continue)

@admin.register(Comida)
class ComidaAdmin(admin.ModelAdmin):
    fields = ('nombre', 'descripcion', 'imagen', 'precio')
    list_display = ('id', 'nombre', 'imagen', 'precio', 'activo')
