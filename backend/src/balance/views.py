from rest_framework import viewsets

from balance.models import Category, Balance
from balance.serializers import CategorySerializer, BalanceSerializer


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BalanceView(viewsets.ModelViewSet):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
