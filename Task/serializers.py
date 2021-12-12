from rest_framework import serializers
from .models import Group, User


class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = ('id', 'name', 'description')


class UserSerializer(serializers.ModelSerializer):
    group_id = serializers.IntegerField(source='group.id')

    class Meta:
        model = User
        fields = ('id', 'username', 'created_at', 'group_id')

    def create(self, validated_data):
        validated_data['group'] = Group.objects.get(id=validated_data['group']['id'])
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.username = validated_data.get('username', instance.username)
        instance.group = Group.objects.get(id=validated_data['group']['id'])
        instance.save()
        return instance
