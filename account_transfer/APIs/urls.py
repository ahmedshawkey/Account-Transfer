from django.urls import path
from .views import AccountListCreate
from .views import create_transaction, get_transactions

urlpatterns = [
    path('accounts/', AccountListCreate.as_view(), name='account-list-create'),
    path('transactions/', create_transaction, name='create-transaction'),
    path('transactions/', get_transactions, name='get-transactions'),
]