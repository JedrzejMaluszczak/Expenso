import calendar
import datetime

from dateutil.relativedelta import relativedelta
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
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        categories = Category.objects.filter(
            user=request.user,
            is_income=(request.query_params.get("isIncome") == "true"),
        )
        return Response(CategorySimplySerializer(categories, many=True).data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data={**request.data, "user": request.user.id})
        serializer.is_valid(raise_exception=True)

        category = Category.objects.create(**serializer.validated_data)

        return Response(
            CategoryBalanceSerializer(category).data, status=status.HTTP_201_CREATED
        )

    @action(methods=["get"], detail=False)
    def list_with_balance(self, request, *args, **kwargs):
        categories = Category.objects.filter(
            user=request.user,
            is_income=(request.query_params.get("isIncome") == "true"),
        )
        return Response(CategoryBalanceSerializer(categories, many=True).data)


class BalanceView(viewsets.ModelViewSet):
    serializer_class = BalanceSerializer

    def get_queryset(self):
        return Balance.objects.filter(category__user=self.request.user)

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

    @action(methods=["get"], detail=False)
    def annual_balance(self, request, *args, **kwargs):
        today = datetime.date.today()
        balance_list = Balance.objects.filter(category__user=request.user)
        annual_balance = {"months": [], "incomes": [], "expenses": []}

        for i in range(11, -1, -1):
            current_date = today - relativedelta(months=i)
            month = current_date.month
            balances = balance_list.filter(date__month=month)

            monthly_incomes = sum(
                balance.amount for balance in balances if balance.category.is_income
            )
            monthly_expenses = sum(
                balance.amount for balance in balances if not balance.category.is_income
            )

            annual_balance["months"].append(calendar.month_abbr[current_date.month])
            annual_balance["incomes"].append(monthly_incomes)
            annual_balance["expenses"].append(monthly_expenses)

        return Response(status=status.HTTP_200_OK, data=annual_balance)
