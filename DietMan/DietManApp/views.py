from django.shortcuts import render
from rest_framework import viewsets,status
from .models import FoodItems
from .serializers import DietSerializer,UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=(AllowAny,)

class DietViewSet(viewsets.ModelViewSet):
    queryset=FoodItems.objects.all()
    serializer_class=DietSerializer
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)








