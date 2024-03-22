# To-Do-List

## Introduction 🖖

#### I've built a dynamic Laravel app that seamlessly manages to-do lists in real-time, leveraging OTP, Redis for caching, and Pusher for live notifications. With React powering the frontend, it delivers a fluid user experience, ensuring efficient task management with added security and responsiveness.

## Installation 💽

Laravel :

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

React

```bash
- cd client
```

```bash
- npm i
```

```bash
- npm start
```

### Inserting in database:

```
- create 2 roles manually from database put this query:
- INSERT INTO roles (role)
  VALUES ('admin'),('user');
```

```
- create at least 1 admin manually from database put this query:
- INSERT INTO users (name, email, password, role_id)
  VALUES ('John Doe', 'johndoe@example.com', 'password123', 1);
```

### Navigate to dashboard:

- login from admin account then go to
  http://localhost:3000/dashboard

# Technologies Used

Here are the key technologies and tools used in this project:

- Laravel: A web application framework for building APIs and web applications in PHP.
- MySQL: An open-source relational database management system.
- React: A JavaScript library for building user interfaces.
- Redis: High-performance, in-memory data store for caching, enhancing application performance.
- Pusher: Real-time communication platform enabling instant updates and notifications in web applications.
- Tailwind CSS: A utility-first CSS framework for designing responsive web applications.

Thank you for your contribution to my website project.
