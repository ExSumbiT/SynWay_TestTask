# Generated by Django 3.2.10 on 2021-12-11 17:04

from django.db import migrations


def create_data(apps, schema_editor):
    Group = apps.get_model('Task', 'Group')
    Group(id=0, name='TestGroup', description='Test Description').save()


class Migration(migrations.Migration):

    dependencies = [
        ('Task', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data)
    ]