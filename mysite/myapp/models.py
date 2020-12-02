from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ParagraphModel(models.Model):
    paragraph = models.CharField(max_length=240)
    title = models.CharField(max_length=30, default = "A paragraph")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class GameRoomModel(models.Model):
    GameRoom = models.CharField(max_length=240)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.GameRoom

class StatModel(models.Model):
    paragraphTitle = models.CharField(max_length=30)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)
    wpm = models.DecimalField( max_digits = 10, decimal_places=2)

    def __str__(self):
        return (str(self.author) + " game on "  + str(self.published_on))