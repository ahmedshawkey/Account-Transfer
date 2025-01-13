from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import Account, Transaction
from .serializers import AccountSerializer, TransactionSerializer
import decimal


# Create your tests here.

class AccountListCreateTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('account-list-create')
        self.account_data = {
            'account_number': '12345678',
            'account_name': 'Test Account',
            'balance': '1000.00'
        }

    def test_create_account(self):
        response = self.client.post(self.url, self.account_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Account.objects.count(), 1)
        self.assertEqual(Account.objects.get().account_number, '12345678')

    def test_list_accounts(self):
        Account.objects.create(**self.account_data)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['account_number'], '12345678')

    def test_duplicate_account_number(self):
        # Create the first account
        response1 = self.client.post(self.url, self.account_data, format='json')
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)

        # Attempt to create another account with the same account_number
        duplicate_account_data = {
            'account_number': '12345678',
            'account_name': 'Duplicate Account',
            'balance': '2000.00'
        }
        response2 = self.client.post(self.url, duplicate_account_data, format='json')

        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(Account.objects.count(), 1)


class TransactionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create-transaction')
        self.get_url = reverse('get-transactions')

        self.sender_account = Account.objects.create(
            account_number='12345678',
            account_name='Sender Account',
            balance=decimal.Decimal('1000.00')
        )

        self.receiver_account = Account.objects.create(
            account_number='87654321',
            account_name='Receiver Account',
            balance=decimal.Decimal('500.00')
        )

    def test_create_transaction_success(self):
        data = {
            'sender_id': self.sender_account.account_number,
            'receiver_id': self.receiver_account.account_number,
            'amount': '100.00'
        }
        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Transaction.objects.count(), 1)
        self.sender_account.refresh_from_db()
        self.receiver_account.refresh_from_db()
        self.assertEqual(self.sender_account.balance, decimal.Decimal('900.00'))
        self.assertEqual(self.receiver_account.balance, decimal.Decimal('600.00'))

    def test_create_transaction_invalid_amount(self):
        data = {
            'sender_id': self.sender_account.account_number,
            'receiver_id': self.receiver_account.account_number,
            'amount': '-50.00'
        }
        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Transaction.objects.count(), 0)

    def test_create_transaction_insufficient_balance(self):
        data = {
            'sender_id': self.sender_account.account_number,
            'receiver_id': self.receiver_account.account_number,
            'amount': '1500.00'
        }
        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Transaction.objects.count(), 0)

    def test_get_transactions(self):
        # Create a transaction
        Transaction.objects.create(
            sender_id=self.sender_account.account_number,
            receiver_id=self.receiver_account.account_number,
            amount=decimal.Decimal('100.00')
        )

        response = self.client.get(self.get_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)