from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.conf import settings


from . import models
from . import forms

# Create your views here.
def index(request):
    if request.method == "POST":
        suggestion_form = forms.SuggestionForm(request.POST)
        if suggestion_form.is_valid():
            suggestion_form.save()
            suggestion_form = forms.SuggestionForm()
    else:
        suggestion_form = forms.SuggestionForm()
    suggestions = models.SuggestionModel.objects.all()
    temp_suggestion=""
    sugg_list = []
    upperLowerCase = False
    for sugg in suggestions:
        temp_suggestion = ""
        for char in sugg.suggestion:
            if upperLowerCase:
                temp_suggestion += char.upper()
            else:
                temp_suggestion += char.lower()
            if char != ' ':
                upperLowerCase = not upperLowerCase
        sugg_list.append(temp_suggestion)
    context = {
        "title":"Suggestions",
        "suggestions":sugg_list,
        "form":suggestion_form,
    }
    return render(request, "index.html", context=context)

def page(request, page=0):
    title = "My Title"
    content = list(range((page+1)*10))[page*10:page*10+10]
    # seen = True
    context = {
        "title":title,
        "body":content,
        "seen":True,
        "prev":page-1,
        "next":page+1
    }
    return render(request, "page.html", context=context)
