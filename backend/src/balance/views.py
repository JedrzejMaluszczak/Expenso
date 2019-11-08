import datetime

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from balance.models import Category, Balance
from balance.serializers import (
    CategorySerializer,
    BalanceSerializer,
    CategorySimplySerializer,
    CategoryBalanceSerializer,
)


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):

        categories = Category.objects.filter(
            user=request.user,
            is_income=(request.query_params.get("isIncome") == "true"),
        )
        return Response(CategorySimplySerializer(categories, many=True).data)

    @action(methods=["get"], detail=False)
    def list_with_balance(self, request, *args, **kwargs):
        categories = Category.objects.filter(
            user=request.user,
            is_income=(request.query_params.get("isIncome") == "true"),
        )
        return Response(CategoryBalanceSerializer(categories, many=True).data)


class BalanceView(viewsets.ModelViewSet):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer

    @action(methods=["get"], detail=False)
    def balance_summary(self, request, *args, **kwargs):
        incomes = Balance.objects.filter(
            category__user=request.user, category__is_income=True
        )
        expenses = Balance.objects.filter(
            category__user=request.user, category__is_income=False
        )

        today = datetime.date.today()

        total_incomes = 0
        monthly_incomes = 0
        today_incomes = 0

        for income in incomes:
            total_incomes += income.amount

            if income.date.month == today.month:
                monthly_incomes += income.amount

            if income.date == today:
                today_incomes += income.amount

        total_expenses = 0
        monthly_expenses = 0
        today_expenses = 0

        for expense in expenses:
            total_expenses += expense.amount

            if expense.date.month == today.month:
                monthly_expenses += expense.amount

            if expense.date == today:
                today_expenses += expense.amount

        result = {
            "incomes": {
                "total": total_incomes,
                "monthly": monthly_incomes,
                "today": today_incomes,
            },
            "expenses": {
                "total": total_expenses,
                "monthly": monthly_expenses,
                "today": today_expenses,
            },
        }

        return Response(status=status.HTTP_200_OK, data=result)
