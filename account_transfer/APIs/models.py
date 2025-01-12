from django.db import models

# Create your models here.

class Account(models.Model):
    account_number = models.CharField(max_length=100, unique=True)
    account_name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.account_name


class Transaction(models.Model):
    sender_id = models.CharField(max_length=100)
    receiver_id = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
