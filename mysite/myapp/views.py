from datetime import datetime, timezone
from django.shortcuts import render, redirect
from django.http import  JsonResponse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required



from . import models
from . import forms

def logout_view(request):
    logout(request)
    return redirect("/registration/login/")

def add_paragraph(request):
    if not request.user.is_authenticated:
        return redirect("/")
    if request.method == "POST":
        form = forms.ParagraphForm(request.POST)
        if form.is_valid():
            form.save(request)
            return redirect("/")
    else:
        form = forms.ParagraphForm()
    context = {
        "title":"Paragraph",
        "form":form
    }
    return render(request, "chat/newParagraph.html", context=context)

# Create your views here.

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

def chat(request):
    return render(request, 'chat/index.html', context = {
        'title': "Chat Home Page"
    })

def room(request, room_name):
    return render(request, 'chat/room/room.html', context = {
        'title': "Chat Room",
        'room_name': room_name
    })
def newParagraph(request):
    return render(request, 'chat/newParagraph.html', context = {
        'title': "New Paragraph"
    })
    
def register(request):
    if request.method == "POST":
        form_instance = forms.RegistrationForm(request.POST)
        if form_instance.is_valid():
            form_instance.save()
            return redirect("/registration/login/")
    else:
        form_instance = forms.RegistrationForm()
    context = {
        "form":form_instance,
    }
    return render(request, "registration/register.html", context=context)