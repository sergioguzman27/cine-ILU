# Generated by Django 2.2.13 on 2021-03-01 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_boleto'),
    ]

    operations = [
        migrations.AddField(
            model_name='compra',
            name='tickets',
            field=models.FileField(null=True, upload_to='boletos'),
        ),
    ]
