from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ParagraphModel(models.Model):
    paragraph = models.CharField(max_length=240)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.paragraph

class GameRoomModel(models.Model):
    GameRoom = models.CharField(max_length=240)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.GameRoom