from django.urls import path

from . import views #convention

urlpatterns = [
    path('', views.index),
    path('<int:page>/', views.page),
]
