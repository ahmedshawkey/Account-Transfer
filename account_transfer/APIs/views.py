from django.shortcuts import render
from rest_framework import generics
from .models import Account
from .serializers import AccountSerializer



# Create your views here.


class AccountListCreate(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


