from django import forms
from django.core.validators import validate_slug
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User



from . import models


class SuggestionForm(forms.Form):
    suggestion = forms.CharField(
        label='Enter any word here to make it Spongebob meme text',
        required=True,
        max_length=240,
        # validators=[validate_slug, must_be_caps, must_be_bob],
    )
    def save(self):
        suggestion_instance = models.SuggestionModel()
        suggestion_instance.suggestion = self.cleaned_data["suggestion"]
        suggestion_instance.save()
        return suggestion_instance
