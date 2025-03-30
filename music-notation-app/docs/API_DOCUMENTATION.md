# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
- **POST** `/users/register`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "name": "string"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "_id": "string",
    "username": "string",
    "email": "string",
    "name": "string",
    "token": "string"
  }
  ```

#### Login User
- **POST** `/users/login`
- **Description**: Login user and get token
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "_id": "string",
    "username": "string",
    "email": "string",
    "name": "string",
    "token": "string"
  }
  ```

#### Get User Profile
- **GET** `/users/profile`
- **Description**: Get current user's profile
- **Headers**: Authorization required
- **Response** (200 OK):
  ```json
  {
    "_id": "string",
    "username": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "favorites": ["string"],
    "collections": ["string"]
  }
  ```

#### Update User Profile
- **PUT** `/users/profile`
- **Description**: Update current user's profile
- **Headers**: Authorization required
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "_id": "string",
    "username": "string",
    "email": "string",
    "name": "string",
    "token": "string"
  }
  ```

### Songs

#### Get All Songs
- **GET** `/songs`
- **Description**: Get list of songs with pagination and filtering
- **Query Parameters**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `search` (string)
  - `notationType` (string)
- **Response** (200 OK):
  ```json
  {
    "songs": [
      {
        "_id": "string",
        "title": "string",
        "artist": "string",
        "album": "string",
        "notationType": "string",
        "createdBy": {
          "_id": "string",
          "username": "string",
          "name": "string"
        }
      }
    ],
    "totalPages": number,
    "currentPage": number
  }
  ```

#### Get Song by ID
- **GET** `/songs/:id`
- **Description**: Get detailed song information
- **Response** (200 OK):
  ```json
  {
    "_id": "string",
    "title": "string",
    "artist": "string",
    "album": "string",
    "notationType": "string",
    "aarohana": "string",
    "avarohana": "string",
    "tempo": "string",
    "timeSignature": "string",
    "raga": "string",
    "taal": "string",
    "sections": [
      {
        "name": "string",
        "order": number,
        "lines": [
          {
            "notes": "string",
            "chords": "string",
            "lyrics": "string",
            "order": number
          }
        ]
      }
    ],
    "tags": ["string"],
    "createdBy": {
      "_id": "string",
      "username": "string",
      "name": "string"
    }
  }
  ```

#### Create Song
- **POST** `/songs`
- **Description**: Create a new song
- **Headers**: Authorization required
- **Request Body**:
  ```json
  {
    "title": "string",
    "artist": "string",
    "album": "string",
    "notationType": "string",
    "aarohana": "string",
    "avarohana": "string",
    "tempo": "string",
    "timeSignature": "string",
    "raga": "string",
    "taal": "string",
    "sections": [
      {
        "name": "string",
        "order": number,
        "lines": [
          {
            "notes": "string",
            "chords": "string",
            "lyrics": "string",
            "order": number
          }
        ]
      }
    ],
    "tags": ["string"]
  }
  ```
- **Response** (201 Created): Created song object

#### Update Song
- **PUT** `/songs/:id`
- **Description**: Update an existing song
- **Headers**: Authorization required
- **Request Body**: Same as Create Song
- **Response** (200 OK): Updated song object

#### Delete Song
- **DELETE** `/songs/:id`
- **Description**: Delete a song
- **Headers**: Authorization required
- **Response** (200 OK):
  ```json
  {
    "message": "Song removed"
  }
  ```

#### Toggle Favorite
- **POST** `/songs/:id/favorite`
- **Description**: Toggle song favorite status
- **Headers**: Authorization required
- **Response** (200 OK):
  ```json
  {
    "favorites": ["string"]
  }
  ```

### Collections

#### Get All Collections
- **GET** `/collections`
- **Description**: Get list of collections with pagination and filtering
- **Query Parameters**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `search` (string)
- **Response** (200 OK):
  ```json
  {
    "collections": [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "createdBy": {
          "_id": "string",
          "username": "string",
          "name": "string"
        }
      }
    ],
    "totalPages": number,
    "currentPage": number
  }
  ```

#### Get Collection by ID
- **GET** `/collections/:id`
- **Description**: Get detailed collection information
- **Response** (200 OK):
  ```json
  {
    "_id": "string",
    "name": "string",
    "description": "string",
    "songs": [
      {
        "_id": "string",
        "title": "string",
        "artist": "string"
      }
    ],
    "tags": ["string"],
    "createdBy": {
      "_id": "string",
      "username": "string",
      "name": "string"
    }
  }
  ```

#### Create Collection
- **POST** `/collections`
- **Description**: Create a new collection
- **Headers**: Authorization required
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "isPublic": boolean,
    "tags": ["string"]
  }
  ```
- **Response** (201 Created): Created collection object

#### Update Collection
- **PUT** `/collections/:id`
- **Description**: Update an existing collection
- **Headers**: Authorization required
- **Request Body**: Same as Create Collection
- **Response** (200 OK): Updated collection object

#### Delete Collection
- **DELETE** `/collections/:id`
- **Description**: Delete a collection
- **Headers**: Authorization required
- **Response** (200 OK):
  ```json
  {
    "message": "Collection removed"
  }
  ```

#### Add Song to Collection
- **POST** `/collections/:id/songs`
- **Description**: Add a song to a collection
- **Headers**: Authorization required
- **Request Body**:
  ```json
  {
    "songId": "string"
  }
  ```
- **Response** (200 OK): Updated collection object

#### Remove Song from Collection
- **DELETE** `/collections/:id/songs/:songId`
- **Description**: Remove a song from a collection
- **Headers**: Authorization required
- **Response** (200 OK): Updated collection object

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Error message",
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to perform this action"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error"
}
``` 