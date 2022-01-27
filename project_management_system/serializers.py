from rest_framework import serializers
from rest_framework_simplejwt.settings import api_settings
from .models import Project, Comments, User, ProjectOwnership


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "gender",
            "birth_date",
            "phone_number",
        )

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == "password":
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name")


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = "__all__"

    def to_representation(self, obj):
        return {
            "id": obj.id,
            "user_id": obj.user_id.id,
            "project_id": obj.project_id.id,
            "content": obj.content,
            "added": obj.added,
            "first_name": obj.user_id.first_name,
            "last_name": obj.user_id.last_name,
        }


class ProjectOwnershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectOwnership
        fields = "__all__"

    def to_representation(self, obj):
        return {
            "user_id": obj.user_id.id,
            "project_id": obj.project_id.id,
            "is_owner": obj.is_owner,
            'full_name': obj.user_id.first_name + ' ' + obj.user_id.last_name,
        }
