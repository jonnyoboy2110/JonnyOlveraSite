from datetime import datetime, timezone
from django.shortcuts import render, redirect
from django.http import  JsonResponse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required



from . import models
from . import forms


def assignment5(request):
    context = {
        "title": "Assignment 5 Page",
    }
    return render(request, "assignment5.html", context=context)
