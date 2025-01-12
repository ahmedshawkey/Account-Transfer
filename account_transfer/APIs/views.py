from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Account, Transaction
from .serializers import AccountSerializer, TransactionSerializer



# Create your views here.


class AccountListCreate(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


@api_view(['POST'])
def create_transaction(request):
    sender_id = request.data.get('sender_id')
    receiver_id = request.data.get('receiver_id')
    amount = request.data.get('amount')
    sender = Account.objects.get(account_number=sender_id)
    receiver = Account.objects.get(account_number=receiver_id)
    amount = int(amount)
    if sender.balance >= amount:
        sender.balance -= amount
        receiver.balance += amount
        sender.save()
        receiver.save()
        transaction = Transaction(sender_id=sender_id, receiver_id=receiver_id, amount=amount)
        transaction.save()
        return Response({'message': 'Transaction successful'}, status=200)
    else:
        return Response({'message': 'Insufficient balance'}, status=400)

@api_view(['GET'])
def get_transactions(request):
    transactions = Transaction.objects.all()
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)