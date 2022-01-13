from django.contrib import admin
from .models import Comments, Project, Profile, ProjectOwnership

admin.site.register(Comments)
admin.site.register(Profile)
admin.site.register(Project)
admin.site.register(ProjectOwnership)