from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class SuggestionForm(forms.Form):
    paragraph = forms.CharField(
        label='Paragraph',
        required=True,
        max_length=240,
    )

    def save(self, request):
        paragraph_instance = models.paragraphModel()
        paragraph_instance.paragraph = self.cleaned_data["paragraph"]
        paragraph_instance.save()
        return suggestion_instance