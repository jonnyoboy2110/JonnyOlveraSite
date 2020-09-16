from django import forms
from django.core.validators import validate_slug
from . import models

def must_be_caps(value):
    if not value.isupper():
        raise forms.ValidationError("Not All Uppercase")
        #alwasy return the cleaned data, whether you have changed it or not
    return value

def must_be_bob(value):
    if not value.startswith("BOB"):
        raise forms.ValidationError("Must Start with BOB also you are ugly")
    return value

class SuggestionForm(forms.Form):
    suggestion = forms.CharField(
    label='Suggestions',
    required = True,
    max_length=240,
    validators = []
    )

    def save(self):
        suggestion_instance = models.SuggestionModel()
        suggestion_instance.suggestion = self.cleaned_data["suggestion"]
        suggestion_instance.save()
        return suggestion_instance
