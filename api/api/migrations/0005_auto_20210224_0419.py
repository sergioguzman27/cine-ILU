# Generated by Django 2.2.13 on 2021-02-24 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_sala_asientos_fila'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sala',
            name='asientos',
            field=models.IntegerField(default=0),
        ),
    ]