<h1 align="center"> Book management system </h1>

Simple system for project management.

---

## Table of Contents

- [Features](#features)
- [Setup](#setup)

---

## Features
- Frontend created using React and backend using Django
- Login system using simple JWT
- REST based forms
- Ability to add, edit and delete projects
- Comments feature with highlighting comment of current user

---

## Setup

Use pip to install dependencies from requirements.txt:

  ```
  $ pip install -r requirements.txt
  ````

or pipenv to install dependencies from Pipfile:

  ```
   $ pipenv install
   $ pipenv shell
  ```

Run Django tests to check if everything is all right:

  ```
  $ python manage.py tests
  ```

Run Django server:

  ```
  $ python manage.py runserver
  ```

or:

  ```
  $ python manage.py runserver 0:8000
  ```

---

then install React:

  ```
  $ npm install
  ```
  
and run it:

  ```
  $ npm start
  ```
