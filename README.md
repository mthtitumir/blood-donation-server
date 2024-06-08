
# Blood & Connect

## Credentials
[Live Server](https://blood-donation-server-odij.onrender.com/) - https://blood-donation-server-odij.onrender.com/

Live Site - [Blood & Connect Live Frontend](https://blood-donation-client-black.vercel.app/)

Admin - email: admin@email.com || password: admin User - email: user@email.com || password: user

Base Api - https://blood-donation-server-odij.onrender.com/api/v1

## Overview

The backend of the Blood & Connect platform is built using Express.js, TypeScript, Prisma, and PostgreSQL. It provides a robust API for user authentication, profile management, and handling blood donation requests. This document outlines the API routes available in the backend and their functionalities.

## Installation and Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/mthtitumir/blood-donation-server.git
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file and add the necessary environment variables (e.g., database connection string, JWT secret).

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Database setup:**
   - Ensure PostgreSQL is installed and running.
   - Run Prisma migrations to set up the database schema:
     ```sh
     npx prisma migrate dev
     ```

## Technologies Used

- **Express.js**: Web framework for Node.js
- **TypeScript**: Superset of JavaScript for type safety
- **Prisma**: ORM for database management
- **PostgreSQL**: Relational database management system

## API Routes

### Auth Routes (`/auth`)

#### 1. Login
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Controller Method**: `AuthController.loginUser`

#### 2. Refresh Token
- **Endpoint**: `/auth/refresh-token`
- **Method**: `POST`
- **Description**: Refreshes the JWT token.
- **Controller Method**: `AuthController.refreshToken`

#### 3. Change Password
- **Endpoint**: `/auth/change-password`
- **Method**: `POST`
- **Description**: Changes the user's password. Accessible by all roles.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER)`
- **Controller Method**: `AuthController.changePassword`

#### 4. Forgot Password
- **Endpoint**: `/auth/forgot-password`
- **Method**: `POST`
- **Description**: Initiates the password reset process.
- **Controller Method**: `AuthController.forgotPassword`

#### 5. Reset Password
- **Endpoint**: `/auth/reset-password`
- **Method**: `POST`
- **Description**: Resets the user's password using a token.
- **Controller Method**: `AuthController.resetPassword`

### User Routes (`/user`)

#### 1. Register User
- **Endpoint**: `/user`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Middleware**: `validateRequest(userValidation.registerUser)`
- **Controller Method**: `userController.registerUser`

#### 2. Get All Users
- **Endpoint**: `/user`
- **Method**: `GET`
- **Description**: Retrieves all users. Accessible by admin roles.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR)`
- **Controller Method**: `userController.getAllUserFromDB`

#### 3. Get All Donors
- **Endpoint**: `/user/all-donors`
- **Method**: `GET`
- **Description**: Retrieves all donor profiles.
- **Controller Method**: `userController.getAllDonorFromDB`

#### 4. Get My Profile
- **Endpoint**: `/user/me`
- **Method**: `GET`
- **Description**: Retrieves the profile of the logged-in user.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER)`
- **Controller Method**: `userController.getMyProfile`

#### 5. Get Single Profile
- **Endpoint**: `/user/:id`
- **Method**: `GET`
- **Description**: Retrieves a user's profile by ID.
- **Controller Method**: `userController.getSingleProfile`

#### 6. Change User Role
- **Endpoint**: `/user/:id/role`
- **Method**: `PATCH`
- **Description**: Changes a user's role. Accessible by admin roles.
- **Middleware**: `validateRequest(userValidation.changeRole)`
- **Controller Method**: `userController.changeRole`

#### 7. Change User Status
- **Endpoint**: `/user/:id/status`
- **Method**: `PATCH`
- **Description**: Changes a user's status. Accessible by admin roles.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN)`, `validateRequest(userValidation.changeStatus)`
- **Controller Method**: `userController.changeStatus`

#### 8. Update My Profile
- **Endpoint**: `/user/update-my-profile`
- **Method**: `PATCH`
- **Description**: Updates the profile of the logged-in user.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER)`, `validateRequest(userValidation.updateMyProfile)`
- **Controller Method**: `userController.updateMyProfile`

### Request Routes (`/request`)

#### 1. Add Request
- **Endpoint**: `/request`
- **Method**: `POST`
- **Description**: Creates a new blood request.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER)`, `validateRequest(RequestValidation.AddRequest)`
- **Controller Method**: `RequestController.AddRequest`

#### 2. Get All Requests
- **Endpoint**: `/request`
- **Method**: `GET`
- **Description**: Retrieves all blood requests. Accessible by admin roles.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR)`
- **Controller Method**: `RequestController.GetAllRequests`

#### 3. Update Request
- **Endpoint**: `/request/:requestId`
- **Method**: `PATCH`
- **Description**: Updates a specific blood request.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER)`, `validateRequest(RequestValidation.UpdateRequest)`
- **Controller Method**: `RequestController.UpdateRequest`

#### 4. Get My Requests
- **Endpoint**: `/request/my-requests`
- **Method**: `GET`
- **Description**: Retrieves all requests made by the logged-in user.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER)`
- **Controller Method**: `RequestController.GetMyRequests`

#### 5. Get Requests to Me
- **Endpoint**: `/request/requests-to-me`
- **Method**: `GET`
- **Description**: Retrieves all requests made to the logged-in user.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER)`
- **Controller Method**: `RequestController.GetRequestsToMe`

#### 6. Update Request Status
- **Endpoint**: `/request/:requestId/update-status`
- **Method**: `PATCH`
- **Description**: Updates the status of a specific request.
- **Middleware**: `auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER)`
- **Controller Method**: `RequestController.UpdateStatus`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
