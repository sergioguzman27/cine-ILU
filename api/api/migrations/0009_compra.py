# Generated by Django 2.2.13 on 2021-02-27 20:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_delete_test'),
    ]

    operations = [
        migrations.CreateModel(
            name='Compra',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boletos_comprados', models.IntegerField()),
                ('monto', models.FloatField()),
                ('funcion', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='compras', to='api.Funcion')),
            ],
        ),
    ]
