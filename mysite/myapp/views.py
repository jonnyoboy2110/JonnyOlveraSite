from datetime import datetime, timezone
from django.shortcuts import render, redirect
from django.http import  JsonResponse
from django.http import  HttpResponse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
import random



from . import models
from . import forms

def logout_view(request):
    logout(request)
    return redirect("/registration/login/")

def add_stat(request):
    if request.method == "POST":
        
        form = forms.StatForm(request.POST)
        if form.is_valid():
            form.save(request)
        else:
            return redirect("/")
    
    return HttpResponse()

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
    stat_models = models.StatModel.objects.all().order_by('-wpm')
    
    if len(stat_models) > 10:
        stat_models = stat_models[:9]
    stat_objects = []
    for rank,stat in enumerate(stat_models,1):
        temp_obj = {}
        temp_obj['player'] = stat.author.username
        temp_obj['title'] = stat.paragraphTitle
        temp_obj['wpm'] = stat.wpm
        temp_obj['rank'] = rank
        stat_objects += [temp_obj]
    return render(request, 'chat/index.html', context = {
        'title': "Chat Home Page",
        'stat_objects': stat_objects,
    })

def room(request, room_name):
    para_models = models.ParagraphModel.objects.all()
    #text = para_object[random.randint(0, len(para_object) -1)].paragraph
    text = para_models[len(para_models)-1].paragraph
    wordList = text.split()
    
    if len(para_models) > 10:
        para_models = para_models[:9]
    para_objects = []
    for count,para in enumerate(para_models,0):
        temp_obj = {}
        temp_obj['paragraph'] = para.paragraph
        temp_obj['title'] = para.title
        temp_obj['order'] = count
        para_objects += [temp_obj]

    return render(request, 'chat/room/room.html', context = {
        'title': "Chat Room",
        'room_name': room_name,
        'paragraph':text,
        'wordList': wordList,
        'paragraphs': para_objects
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