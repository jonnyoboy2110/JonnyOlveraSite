from django.urls import path
from django.contrib.auth import views as auth_views

from . import views #convention

urlpatterns = [
    path('', views.index),
    path('resume/', views.resume),
    path('chat/', views.chat, name='chat'),
    path('chat/add_paragraph/', views.add_paragraph),
    path('chat/add_stat/', views.add_stat),
    path('registration/login/', auth_views.LoginView.as_view()),
    path('registration/register/', views.register),
    path('chat/registration/register/', views.register),
    path('logout/', views.logout_view),
    path('chat/room/<str:room_name>/', views.room, name='room'),
    
    

]
