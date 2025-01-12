from django.urls import path
from .views import AccountListCreate
from .views import create_transaction, get_transactions
from .views import get_accounts_from_file

urlpatterns = [
    path('accounts/', AccountListCreate.as_view(), name='account-list-create'),
    path('transactions/', create_transaction, name='create-transaction'),
    path('transactions/', get_transactions, name='get-transactions'),
    path('accounts/upload/', get_accounts_from_file, name='get-accounts-from-file'),
]