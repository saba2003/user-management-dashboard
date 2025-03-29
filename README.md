### User Management Dashboard

## Overview

  

This project is a **User Management Dashboard** built with **Angular 19**, **PrimeNG**, and **Tailwind CSS**. It provides functionalities for user registration, authentication, role-based access control, user profile management, and admin functionalities such as user CRUD operations.

The application also implements **guards** for authentication and role-based access, making sure that only authorized users can access the appropriate pages.


## Design choices

- **Navbar abscence**: for simplicity and more intuitivity there's a simple dropdown on the dashboard instead of a navbar/sidebar

![navigation](https://github.com/user-attachments/assets/c236f521-eb7b-47c7-920d-d21ac6255f2a)

- **Simple user management**: admins see all the users and can interact with them: view details, edit, delete

![dashboard small](https://github.com/user-attachments/assets/fb17989a-addb-40be-970e-c7f0375c0b55)

- **Non-admin users**: Non-admin users do not see other users and can only interact with their own profile details and if they try to navigate to other routes they are rerouted back.

![user details](https://github.com/user-attachments/assets/1747170b-d710-43cc-95f7-a5c2744d5d50)

## Features

- **User Registration**: Users can register using a form with username, email, and password.

  ![register](https://github.com/user-attachments/assets/a3cabc3f-4232-434f-897a-5fe250fcd0c5)

- **Login & Logout**: A login form that allows registered users to sign in and navigate through the dashboard.

  ![error handling](https://github.com/user-attachments/assets/e7db34e7-fb2b-42da-a730-f3886b774427)

- **Role-Based Access Control (RBAC)**: The app differentiates between `admin` and `user` roles, where only admins can manage users.

- **User Profile**: Each user has their own profile page that they can view and edit.

- **User Management for Admins**: Admin users can view, edit, and delete users.

- **Guard-based Navigation**: The app ensures proper access control with guards like `authGuard`, `adminGuard`, and `userGuard`.
  

## Architecture

  

- **Component-based Architecture**: Components are designed to follow Angular’s modular system. Each feature (user list, user details, etc.) has its own component.

- **Service Layer**: Services like `UserService` handle all interactions with backend APIs and data storage.

- **Routing**: Angular's **Router** handles navigation between pages. Guards are used to prevent unauthorized access.

- **Reactive Forms**: Angular's `ReactiveForms` are used to handle form validations for user registration, login, and profile update.


## Technologies Used

  

- **Angular 19**: The front-end framework for building the single-page application (SPA).

- **PrimeNG**: A UI component library for Angular.

- **Tailwind CSS**: A utility-first CSS framework for styling the app.

- **RxJS**: Reactive programming library for managing asynchronous operations.

- **HTTPClient**: Used to communicate with the backend API.


- ### Clone the repository and install dependencies
```bash

git clone https://github.com/saba2003/user-management-dashboard.git 
cd user-management-dashboard
npm install

```

Run the application
```bash

npm start

```

Go to the db directory and run the json server
```bash

cd src/app/db
json-server users.json

```
