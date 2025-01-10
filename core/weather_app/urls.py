from django.urls import path,include
from . import views
urlpatterns = [
    path("",views.home,name="home"),
    path("search_city/",views.return_data_city,name="data_by_city")
]
