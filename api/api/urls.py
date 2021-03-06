from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets


router = DefaultRouter()
router.register(r'comidas', viewsets.ComidaViewset)
router.register(r'compras', viewsets.ComprasViewset)
router.register(r'funciones', viewsets.FuncionesViewset)
router.register(r'peliculas', viewsets.PeliculasViewSet, basename='peliculas')
router.register(r'salas', viewsets.SalaViewset)


urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]