# Generated by Django 3.2.10 on 2022-01-09 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_management_system', '0004_alter_project_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='added',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]