# Generated by Django 3.2.8 on 2023-03-19 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_onlineuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_shop_owner',
            field=models.BooleanField(default=False),
        ),
    ]
