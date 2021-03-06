from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from . import models

def must_be_unique(value):
    user = User.objects.filter(email=value)
    if len(user) > 0:
        raise forms.ValidationError("Email Already in Use")
    return value

class ParagraphForm(forms.Form):
    title = forms.CharField(
        label='Title',
        required=True,
        max_length=30,
    )
    paragraph = forms.CharField(
        label='Paragraph',
        required=True,
        max_length=240,
    )


    def save(self, request):
        paragraph_instance = models.ParagraphModel()
        paragraph_instance.paragraph = self.cleaned_data["paragraph"]
        paragraph_instance.title = self.cleaned_data["title"]
        paragraph_instance.author = request.user
        paragraph_instance.save()
        return paragraph_instance

class GameRoomForm(forms.Form):
    GameRoomName = forms.CharField(
        label='GameRoom',
        required=True,
        max_length=10,
    )

    def save(self, request):
        game_room_instance = models.gameRoomModel()
        game_room_instance.GameRoom = self.cleaned_data["GameRoomName"]
        game_room_instance.author = request.user
        game_room_instance.save()
        return game_room_instance

class StatForm(forms.Form):
    paragraphTitle = forms.CharField(
        label='Title',
        required=True,
        max_length=30,
    )
    wpm = forms.DecimalField(
        label='WPM',
        required=True,
        decimal_places=2,
    )
    def save(self, request):
        stat_instance = models.StatModel()
        stat_instance.paragraphTitle = self.cleaned_data["paragraphTitle"]
        stat_instance.wpm = self.cleaned_data["wpm"]
        stat_instance.author = request.user
        stat_instance.save()

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(
        label="Email",
        required=True,
        validators=[must_be_unique]
    )

    class Meta:
        model = User
        fields = ("username", "email",
                  "password1", "password2")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user