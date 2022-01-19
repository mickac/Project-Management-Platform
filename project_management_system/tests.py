from django.contrib.auth import get_user_model
from django.test import TestCase
from project_management_system.views import current_user
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse_lazy, reverse
from .models import Project


class UsersManagersTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            email='normal@user.com',
            password='foo',
            first_name='test',
            last_name='user',
            birth_date='1996-12-21')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertEqual(user.birth_date, '1996-12-21')
        self.assertEqual(user.first_name, 'test')
        self.assertEqual(user.last_name, 'user')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")


class TestProjectCreate(APITestCase):

    def auth(self):
        User = get_user_model()
        email = 'test@user.com'
        password = 'test'
        User.objects.create_user(
            email=email,
            password=password,
            first_name='test',
            last_name='user',
            gender='Male',
            birth_date='1996-12-21')

        response = self.client.post(reverse('token_obtain_pair'), {
            'email': email,
            'password': password})

        self.client.credentials(HTTP_AUTHORIZATION="Bearer " +
                                response.data['access'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_no_auth(self):
        sample_project = {'title': "test", "details": "test_details",
                          "start_date": "2022-01-01", "end_date": "2022-12-21",
                          "status": "1"}
        response = self.client.post(reverse(
                                    'project_management_system:projects'),
                                    sample_project)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_with_auth(self):
        previous_projects_count = Project.objects.all().count()
        self.auth()
        sample_project = {'title': "test", "details": "test_details",
                          "start_date": "2022-01-01", "end_date": "2022-12-21",
                          "status": "1"}
        response = self.client.post(reverse(
                                    'project_management_system:projects'),
                                    sample_project)
        self.assertEqual(Project.objects.all().count(), previous_projects_count+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'test')
        self.assertEqual(response.data['details'], 'test_details')
        self.assertEqual(response.data['start_date'], '2022-01-01')
        self.assertEqual(response.data['end_date'], '2022-12-21')
        self.assertEqual(response.data['status'], 1)

    def test_retrives_all_projects(self):
        self.auth()
        response = self.client.get(reverse(
                                    'project_management_system:projects'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_current_user(self):
        self.auth()
        response = self.client.get(reverse(
                                    'project_management_system:current_user'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
