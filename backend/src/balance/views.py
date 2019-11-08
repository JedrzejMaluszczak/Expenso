from rest_framework import viewsets
from rest_framework.response import Response

from balance.models import Category, Balance
from balance.serializers import (
    CategorySerializer,
    BalanceSerializer,
    CategorySimplySerializer,
)


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):

        categories = self.queryset.filter(
            user=request.user,
            is_income=(request.query_params.get("isIncome") == "true"),
        )
        return Response(CategorySimplySerializer(categories, many=True).data)


class BalanceView(viewsets.ModelViewSet):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
