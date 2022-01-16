from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token
from project_management_system import views

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectView, 'project')
router.register(r'comments', views.CommentsView, 'comment')
router.register(r'userlist', views.UserView, 'userlist')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token-auth/', obtain_jwt_token),
    path('api/pms/', include('project_management_system.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
