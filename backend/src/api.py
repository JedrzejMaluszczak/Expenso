from rest_framework import routers

from balance.views import BalanceView, CategoryView

router = routers.DefaultRouter()

router.register("balance", BalanceView)
router.register("category", CategoryView)
