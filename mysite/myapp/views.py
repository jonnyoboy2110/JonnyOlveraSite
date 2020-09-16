from django.shortcuts import render
from django.http import HttpResponse
from . import models
from . import forms
# Create your views here.

def index(request):
    # if request.method == "POST":
    #     suggestion_form = forms.SuggestionForm(request.POST)
    #     if suggestion_form.is_valid():
    #         suggestion_form.save()
    #         suggestion_form = forms.SuggestionForm()
    # else:
    #         suggestion_form = forms.SuggestionForm()
    # suggestions = models.SuggestionModel.objects.all()
    # context = {
    #     "title":"Suggestions",
    #     "suggestions" : suggestions,
    #     "form": suggestion_form,
    # }
    # return render(request,"index.html", context = context)
    content = "CINS465 Hello World"
    context = {
        "title":"Hello World Title",
        "body": content,

    }
    return render(request,"index.html", context = context)
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
