# Generated by Django 3.1.2 on 2020-12-02 22:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myapp', '0003_auto_20201202_1850'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paragraphmodel',
            name='title',
            field=models.CharField(default='A paragraph', max_length=30),
        ),
        migrations.CreateModel(
            name='StatModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paragraphTitle', models.CharField(max_length=30)),
                ('published_on', models.DateTimeField(auto_now_add=True)),
                ('wpm', models.DecimalField(decimal_places=2, max_digits=10)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
