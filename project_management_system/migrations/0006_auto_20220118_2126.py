# Generated by Django 3.2.11 on 2022-01-18 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_management_system', '0005_alter_projectownership_project_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='projects',
            field=models.ManyToManyField(through='project_management_system.ProjectOwnership', to='project_management_system.Project'),
        ),
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.TextField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Unknown', 'Unknown')], max_length=15),
        ),
    ]