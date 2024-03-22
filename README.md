# To-Do-List

## Introduction 🖖

I develop a comprehensive Laravel application that incorporates a To-Do List management with real-time
notifications and caching features.

## Installation 💽

```bash
- cd server
```

```bash
- composer install
```

```bash
- php artisan migrate
```

```bash
- php artisan serve
```

```bash
- cd client
```

```bash
- npm i
```

```bash
- npm start
```

- create 2 roles manually from database put this query:
- INSERT INTO roles (role)
  VALUES ('admin'),('user');

- create at least 1 admin manually from database put this query:
- INSERT INTO users (name, email, password, role_id)
  VALUES ('John Doe', 'johndoe@example.com', 'password123', 1);

- to go to dashboard:
- login from admin account then go to
  http://localhost:3000/dashboard
