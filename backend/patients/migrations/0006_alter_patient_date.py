# Generated by Django 4.2.3 on 2023-07-13 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0005_patient_hospital'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='date',
            field=models.DateField(),
        ),
    ]
