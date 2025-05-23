# SureRide API Documentation

## User Endpoints

### Register User
- **Endpoint**: `POST /users/register`
- **Description**: Register a new user in the system
- **Body (JSON)**:
  - `fullName.firstName` (String, min. 3 chars, required)
  - `fullName.lastName` (String, min. 3 chars, optional)
  - `email` (String, valid email, required)
  - `password` (String, min. 6 chars, required)
- **Response**:
  - **201**: Successful registration (returns `{ token, user }`)
  - **400**: User already exists (returns `{ message: 'User already exists' }`)
  - **422**: Validation errors (returns `{ errors }`)
- **Example**:
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Login User
- **Endpoint**: `POST /users/login`
- **Description**: Authenticate a user and get access token
- **Body (JSON)**:
  - `email` (String, valid email, required)
  - `password` (String, min. 6 chars, required)
- **Response**:
  - **200**: Successful login (returns `{ token, user }` and sets cookie)
  - **401**: Authentication failed (returns `{ message: 'Invalid email or password' }`)
  - **422**: Validation errors (returns `{ errors }`)
- **Example**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Get User Profile
- **Endpoint**: `GET /users/profile`
- **Description**: Get the current authenticated user's profile
- **Authentication**: Required
  - Bearer token in Authorization header (`Authorization: Bearer <token>`)
  - OR token in cookie
- **Response**:
  - **200**: Success (returns user object)
  - **401**: Unauthorized (token not found, invalid or expired)
- **Example Request**:
  ```
  GET /users/profile
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

### Logout User
- **Endpoint**: `GET /users/logout`
- **Description**: Logout the current authenticated user
- **Authentication**: Required
  - Bearer token in Authorization header (`Authorization: Bearer <token>`)
  - OR token in cookie
- **Response**:
  - **200**: Success (returns `{ message: 'Logout successful' }`)
  - **401**: Unauthorized (token not found, invalid or expired)
- **Notes**:
  - Clears the token cookie
  - Adds the token to a blacklist to prevent reuse

## Captain Endpoints

### Register Captain
- **Endpoint**: `POST /captains/register`
- **Description**: Register a new captain in the system
- **Body (JSON)**:
  - `fullName.firstName` (String, min. 3 chars, required)
  - `fullName.lastName` (String, min. 3 chars, optional)
  - `email` (String, valid email, required)
  - `password` (String, min. 6 chars, required)
  - `vehicle.color` (String, min. 3 chars, required)
  - `vehicle.plate` (String, min. 3 chars, required)
  - `vehicle.capacity` (Number, required)
  - `vehicle.vehicleType` (String, must be one of: 'car', 'motorcycle', 'auto', required)
- **Response**:
  - **201**: Successful registration (returns `{ token, captain }`)
  - **400**: Captain already exists (returns `{ message: 'Captain already exists' }`)
  - **422**: Validation errors (returns `{ errors }`)
- **Example**:
  ```json
  {
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```

### Login Captain
- **Endpoint**: `POST /captains/login`
- **Description**: Authenticate a captain and get access token
- **Body (JSON)**:
  - `email` (String, valid email, required)
  - `password` (String, min. 6 chars, required)
- **Response**:
  - **200**: Successful login (returns `{ token, captain }` and sets cookie)
  - **400**: Authentication failed (returns `{ message: 'Invalid email or password' }`)
  - **422**: Validation errors (returns `{ errors }`)
- **Example**:
  ```json
  {
    "email": "jane@example.com",
    "password": "password123"
  }
  ```

### Get Captain Profile
- **Endpoint**: `GET /captains/profile`
- **Description**: Get the current authenticated captain's profile
- **Authentication**: Required
  - Bearer token in Authorization header (`Authorization: Bearer <token>`)
  - OR token in cookie
- **Response**:
  - **200**: Success (returns `{ captain }` object)
  - **401**: Unauthorized (token not found, invalid or expired)
- **Example Request**:
  ```
  GET /captains/profile
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

### Logout Captain
- **Endpoint**: `GET /captains/logout`
- **Description**: Logout the current authenticated captain
- **Authentication**: Required
  - Bearer token in Authorization header (`Authorization: Bearer <token>`)
  - OR token in cookie
- **Response**:
  - **200**: Success (returns `{ message: 'Logout successful' }`)
  - **401**: Unauthorized (token not found, invalid or expired)
- **Notes**:
  - Clears the token cookie
  - Adds the token to a blacklist to prevent reuse

## Authentication

All protected endpoints require authentication using one of the following methods:

1. **Bearer Token**: Include the JWT token in the Authorization header
   ```
   Authorization: Bearer <your_token>
   ```

2. **Cookie**: The token is stored in a cookie named "token" after login
