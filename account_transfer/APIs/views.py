import decimal
from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Account, Transaction
from .serializers import AccountSerializer, TransactionSerializer
import csv
import io
import pandas as pd



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
    amount = decimal.Decimal(amount)

    if (amount <= 0):
        return Response({'message': 'Invalid amount(amount can not be less than 0)'}, status=400)

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



@api_view(['POST'])
def get_accounts_from_file(request):
    accounts_file = request.FILES['file']
    file_type = accounts_file.name.split('.')[-1].lower()

    try:
        if file_type == 'csv' or file_type == 'txt':
            df = pd.read_csv(accounts_file)
        elif file_type in ['xls', 'xlsx']:
            df = pd.read_excel(accounts_file)
        else:
            return Response({'message': 'Unsupported file type'}, status=400)

        for _, row in df.iterrows():
            account_number, account_name, balance = row
            account = Account(account_number=account_number, account_name=account_name, balance=balance)
            account.save()

        return Response({'message': 'Accounts created successfully'}, status=200)

    except Exception as e:
        return Response({'message': str(e)}, status=400)
