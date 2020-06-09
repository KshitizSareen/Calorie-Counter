from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import DietViewSet,UserViewSet

router=routers.DefaultRouter()
router.register('Diet',DietViewSet)
router.register('users',UserViewSet)

urlpatterns=[
    path('',include(router.urls))
]