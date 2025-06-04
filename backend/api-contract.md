# ConnectOrlando API Index

## Authentication (register.js/login.js)
POST /register
POST /login

## Reserve
POST   /reserve                - create a reservation
PUT    /reserve/:reservationId - update an existing reservation
DELETE /reserve/:reservationId - cancel a reservation

## History 
GET    /history/:userId        - list past reservations for a user

## Locations
GET /locations

## Reasons
GET /reasons

## Address Verification
POST /verify-address                - check if an address is inside Orlando

## Admin Routes Information (line 163)
### (requires logged-in user with isStaff=true)
POST /admin                         - admin login (optional)
GET  /admin/users                   - list all users
GET  /admin/users/:userId           - view a single user
PUT  /admin/users/:userId/:column/:value - update a user field
GET  /admin/reservations            - list all reservations
DELETE /admin/reservations/:id      - delete a reservation
POST /admin/log-device              - record a manual device checkout

# API CONTRACT


## GET /reasons
Returns a list of reasons for device use.

### Response:
```json

//Something to collaborate with the frontend team on - preset reasons!

[
  "Job Interview",
  "Homework",
  "Personal Emergency",
  "Entertainment",
]
```

## POST /register
### Request Body:
```json
{
  "username": "billgates",
  "password": "hashed_password_here",
  "email": "person@email.net",
  "firstName": "Bill",
  "lastName": "Gates",
  "address": "123 Best Rd, Winter Garden FL 34787",
  "phone": 4071112222,
  "isStaff": false
}

```
### Response:
```json
{
  "message": "User registered successfully",
  "userId": 23
}

```
### Response (Failure):
```json
{
  "error": "Email already exists"
}

```

## POST /login


### Request Body:
```json
{
  "identifier": "billgates", // username
  "password": "user-password"
}
```

### Response:
```json
{
  "message": "Login successful",
  "userId": 27
}

OR

{
  "error": "No account with those credentials found"
}
```

## POST /reserve
### Request Body:
```json
{
  "startTime": "2024-06-10T14:00:00",
  "endTime": "2024-06-10T16:00:00",
  "locationId": 1,
  "reason": "Other",
  "otherReason": "I want to watch Minecraft Let's Plays"
}
```
### Response:
```json
{
  "message": "Reservation created",
  "reservationId": 1
}
```
## GET /history/:userID
```json
//Used for the “View Past Reservations” section in the user dashboard
```

### Request
[
  {
    "reservationId": 55,
    "locationId": 1,
    "startTime": "2024-06-01T10:00:00",
    "endTime": "2024-06-01T12:00:00",
    "reason": "Telehealth"
  },
  ...
]

```json
```

## GET /locations
### Request
[
  { "locationId": 1, "name": "Main Library" },
  { "locationId": 2, "name": "Downtown Center" }
]

```json
```

## GET /reasons
### Request
[
  { "locationId": 1, "name": "Location 1" },
  { "locationId": 2, "name": "Location 2" }
]

```json
```

## Admin Routes Information
### (requires logged-in user with isStaff=true)
POST /admin                         - admin login (optional)
GET  /admin/users                   - list all users
GET  /admin/users/:userId           - view a single user
PUT  /admin/users/:userId/:column/:value - update a user field
GET  /admin/reservations            - list all reservations
DELETE /admin/reservations/:id      - delete a reservation
POST /admin/log-device              - record a manual device checkout

### All admin routes should:
Require the user to be logged in
Validate that the isStaff flag is true for the current session or token

### POST /admin
### Request Body:
```json
{
  "identifier": "billgates", // username
  "password": "user-password"
}
```

### Response:
```json
{
  "message": "Login successful",
  "userId": 27
}

OR

{
  "error": "No account with those credentials found"
}

```
### GET /admin/users
[
  {
    "userId": 1,
    "username": "janedoe",
    "email": "jane@email.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "phone": 3219876543
  },
  {
    "userId": 2,
    "username": "bsmith",
    "email": "bob@email.com",
    "firstName": "Bob",
    "lastName": "Smith",
    "phone": 4075550000
  }
]

### GET /admin/users/:userId
{
  "userId": 1,
  "username": "janedoe",
  "email": "jane@email.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "address": "456 Maple Ave",
  "phone": 3219876543,
  "isStaff": false
}

### GET /admin/reservations
[
  {
    "reservationId": 10,
    "userId": 1,
    "deviceId": 2,
    "locationId": 1,
    "startTime": "2024-06-10T14:00:00",
    "endTime": "2024-06-10T16:00:00",
    "reason": "Telehealth"
  },
  ...
]

### POST /admin/log-device
Purpose: Log a manual device checkout via the usage_history table

#### Request
{
  "userId": 27,
  "deviceId": 5,
  "locationId": 1,
  "startTime": "2024-06-11T10:00:00",
  "endTime": "2024-06-11T12:00:00",
  "reason": "Manual override",
  "adminNotes": "Device handed out manually"
}

#### Response
{
  "message": "Device usage logged",
  "referenceId": 88
}

