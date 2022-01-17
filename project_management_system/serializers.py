from rest_framework import serializers
from rest_framework_simplejwt.settings import api_settings
from .models import Project, Comments, User, ProjectOwnership


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'title', 'details', 'start_date', 'end_date', 'status', 'added')


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'gender', 'birth_date', 'phone_number')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'

    def to_representation(self, obj):
        return {
            'id': obj.id, 
            'user_id': obj.user_id.id, 
            'project_id': obj.project_id.id, 
            'content': obj.content, 
            'added': obj.added,
            'first_name': obj.user_id.first_name,
            'last_name': obj.user_id.last_name,
        }       


class ProjectOwnershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectOwnership
        fields = '__all__'

    def to_representation(self, obj):
        return {
            'user_id': obj.user_id.id, 
            'project_id': obj.project_id.id, 
            'is_owner': obj.is_owner,
            'full_name': obj.user_id.first_name + ' ' + obj.user_id.last_name,
        }     


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'email', 'password')