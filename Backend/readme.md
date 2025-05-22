# /users/register

## Description
Register a new user.

## Request
- **Endpoint**: `POST /users/register`
- **Body (JSON)**:
  - `fullName.firstName` (String, min. 3 chars, required)
  - `fullName.lastName` (String, min. 3 chars, optional)
  - `email` (String, valid email, required)
  - `password` (String, min. 6 chars, required)

## Response
- **201**: Successful registration (returns `{ token, user }`) 
- **422**: Validation errors (returns `{ errors }`)

## Example
