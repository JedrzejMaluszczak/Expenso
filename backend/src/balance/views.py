import calendar
import datetime
from collections import defaultdict

from django.db import connection
from dateutil.relativedelta import relativedelta
from django.db.models import Sum
from django.db.models.functions import Coalesce
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
        user_balances = Balance.objects.filter(category__user=request.user)
        today = datetime.date.today()

        income_total = user_balances.filter(category__is_income=True).aggregate(
            total=Coalesce(Sum("amount"), 0)
        )

        income_monthly = user_balances.filter(
            category__is_income=True, date__month=today.month
        ).aggregate(monthly=Coalesce(Sum("amount"), 0))

        income_today = user_balances.filter(
            category__is_income=True, date=today
        ).aggregate(today=Coalesce(Sum("amount"), 0))

        expenses_total = user_balances.filter(category__is_income=False).aggregate(
            total=Coalesce(Sum("amount"), 0)
        )

        expenses_monthly = user_balances.filter(
            category__is_income=False, date__month=today.month
        ).aggregate(monthly=Coalesce(Sum("amount"), 0))

        expenses_today = user_balances.filter(
            category__is_income=False, date=today
        ).aggregate(today=Coalesce(Sum("amount"), 0))

        result = {
            "incomes": {**income_total, **income_monthly, **income_today},
            "expenses": {**expenses_total, **expenses_monthly, **expenses_today},
        }

        return Response(status=status.HTTP_200_OK, data=result)

    @action(methods=["get"], detail=False)
    def annual_balance(self, request, *args, **kwargs):
        today = datetime.date.today()
        balance_list = Balance.objects.filter(category__user=request.user)
        incomes_sum_qs = (
            balance_list.filter(category__is_income=True)
            .order_by("date__month")
            .values("date__month")
            .annotate(Sum("amount"))
        )

        expenses_sum_qs = (
            balance_list.filter(category__is_income=False)
            .order_by("date__month")
            .values("date__month")
            .annotate(Sum("amount"))
        )

        incomes_dict = {
            balance["date__month"]: balance["amount__sum"] for balance in incomes_sum_qs
        }
        expenses_dict = {
            balance["date__month"]: balance["amount__sum"]
            for balance in expenses_sum_qs
        }

        annual_balance = defaultdict(list)
        for i in range(11, -1, -1):
            current_date = today - relativedelta(months=i)
            annual_balance["months"].append(calendar.month_abbr[current_date.month])
            annual_balance["incomes"].append(incomes_dict.get(current_date.month, 0))
            annual_balance["expenses"].append(expenses_dict.get(current_date.month, 0))

        return Response(status=status.HTTP_200_OK, data=annual_balance)
