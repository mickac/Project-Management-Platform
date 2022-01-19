from django.contrib import admin
from .models import Comments, Project, ProjectOwnership, User

admin.site.register(Comments)
admin.site.register(User)
admin.site.register(Project)
admin.site.register(ProjectOwnership)
