# Generated by Django 3.2.8 on 2023-04-09 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(default='product_images/default.jpg', upload_to='product_images'),
        ),
    ]
