 React Authentication App (Login & Signup)

This is a simple user authentication frontend built using **React**, **Formik**, **Yup**, **Axios**, **Redux**, and **Tailwind CSS**. It allows users to **sign up** and **log in** with roles (`admin`, `user`), and securely manages authentication states.

  Features

 - User registration (signup) with validation
-  User login with JWT-based authentication
-  Secure backend API with protected routes
-  MongoDB for database storage
-  HTTP-only cookies for secure token storage
-  Global user state with Redux
-  Axios for frontend-backend communication
-  Form validation with Formik + Yup
-  React Router for navigation
-  Tailwind CSS for styling
-  Notifications using Sonner (toast)

 Tech Stack

Frontend: React, Redux, React Router
Styling: Tailwind CSS
Forms: Formik, Yup
Backend: Node.js, Express.js
Authentication: JWT (JSON Web Tokens)
Database: MongoDB (Mongoose)
Toast Notifications: Sonner
HTTP Requests: Axios

 Pages

  Signup Page
- Route: `/signup`
- Allows new users to register with:
  - Email
  - Password (min 6 characters)
  - Role (`admin` or `user`)

  Login Page
- Route: `/login`
- Allows existing users to authenticate.
- On success:
  - Stores user data in Redux
  - Navigates to `/home`
  - Shows success toast

  Home Page
- Route: `/home`
- Displays:
  - Logged-in user's name, email, and role
  - Logout button
- Logs out user and clears Redux state
