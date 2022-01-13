from rest_framework import serializers
from .models import Project, Comments


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'title', 'details', 'start_date', 'end_date', 'status', 'added')


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('id', 'user_id', 'project_id', 'content', 'added')
        