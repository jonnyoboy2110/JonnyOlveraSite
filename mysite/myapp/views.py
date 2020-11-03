from datetime import datetime, timezone
from django.shortcuts import render, redirect
from django.http import  JsonResponse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required



from . import models
from . import forms


def index(request):
    context = {
        "title": "Jonathan's Page",
    }
    return render(request, "index.html", context=context)

def resume(request):
    context = {
        "title": "Jonathan's Resume",
    }
    return render(request, "resume.html", context=context)
