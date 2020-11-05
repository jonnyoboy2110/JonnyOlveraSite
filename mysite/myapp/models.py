from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ParagraphModel(models.Model):
    Paragraph = models.CharField(max_length=240)

    def __str__(self):
        return self.suggestion