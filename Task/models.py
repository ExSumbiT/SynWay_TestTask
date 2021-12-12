from django.db import models


class Group(models.Model):
    id = models.AutoField('Id', primary_key=True)
    name = models.TextField('Name', default='Empty Name', max_length=255)
    description = models.TextField('Description', default='No Description')

    def __str__(self):
        return self.name


class User(models.Model):
    username = models.TextField('Username', max_length=255)
    created_at = models.DateTimeField('Created At', auto_now_add=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return self.username

