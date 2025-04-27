# API Endpoints

Descripción de cada uno de los endpoints de la API, los parámetros esperados y el formato de respuesta.

# Index

- [User Endpoints](#user-endpoints)
	- [Register User](#register-user)
	- [Login User](#login-user)
	- [Find All Users](#find-all-users)
	- [Find One User](#find-one-user)
	- [Update User](#update-user)
	- [Delete User](#delete-user)
- [Truck Endpoints](#truck-endpoints)
	- [Create Truck](#create-truck)
	- [Find All Trucks](#find-all-trucks)
	- [Find All Trucks By User](#find-all-trucks-by-user)
	- [Find One Truck](#find-one-truck)
	- [Update Truck](#update-truck)
	- [Delete Truck](#delete-truck)
- [Location Endpoints](#location-endpoints)
	- [Create Location](#create-location)
	- [Find All Locations](#find-all-locations)
	- [Find One Location](#find-one-location)
	- [Update Location](#update-location)
	- [Delete Location](#delete-location)
- [Order Endpoints](#order-endpoints)
	- [Create Order](#create-order)
	- [Find All Orders](#find-all-orders)
	- [Find One Order](#find-one-order)
	- [Update Order](#update-order)
	- [Delete Order](#delete-order)

# API

## User Endpoints

### Register User

```http
POST /api/user/register
```

**Request Body**:
```json
{
	"email": "string",
	"password": "string"
}
```

**Response**:
```json
{
	"message": "User created successfully"
}
```

### Login User

```http
POST /api/user/login
```

**Request Body**:
```json
{
	"email": "string",
	"password": "string"
}
```

**Response**:
```json
{
	"message": "Login successful",
	"token": "string"
}
```

### Find All Users

```http
GET /api/user/findAll
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
[
	{
		"_id": "string",
		"email": "string"
	},
	{
		"_id": "string",
		"email": "string"
	},
	...
]
```

### Find One User

```http
GET /api/user/findOne/{id}
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
{
	"_id": "string",
	"email": "string"
},
```

### Update User

```http
PATCH /api/user/update/{id}
```

```Header
Authorization: Bearer {token}
```

**Request Body**:
```json
{
	"email": "string",
	"password": "string"
}
```

**Response**:
```json
{
	"message": "User updated successfully"
}
```

### Delete User

```http
DELETE /api/user/delete/{id}
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
{
	"message": "User deleted successfully"
}
```

## Truck Endpoints

### Create Truck

```http
POST /api/trucks/create
```

```Header
Authorization: Bearer {token}
```

**Request Body**:
```json
{
	"user": "string",
	"year": "string",
	"color": "string",
	"plates": "string"
}
```

**Response**:
```json
{
	"message": "Truck created successfully"
}
```

### Find All Trucks

```http
GET /api/trucks/findAll
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
[
	{
		"_id": "string",
		"user": ¨{
			"email": "string"
		},
		"year": "string",
		"color": "string",
		"plates": "string"
	},
	{
		"_id": "string",
		"user": ¨{
			"email": "string"
		},
		"year": "string",
		"color": "string",
		"plates": "string"
	},
	...
]
```

### Find All Trucks By User

```http
GET /api/trucks/findAll/user/{id}
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
[
	{
		"_id": "string",
		"year": "string",
		"color": "string",
		"plates": "string"
	},
	{
		"_id": "string",
		"year": "string",
		"color": "string",
		"plates": "string"
	},
	...
]
```

### Find One Truck

```http
GET /api/trucks/findOne/{id}
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
{
	"_id": "string",
	"user": ¨{
		"email": "string"
	},
	"year": "string",
	"color": "string",
	"plates": "string"
}
```

### Update Truck

```http
PATCH /api/trucks/update/{id}
```

```Header
Authorization: Bearer {token}
```

**Request Body**:
```json
{
	"user": "string",
	"year": "string",
	"color": "string",
	"plates": "string"
}
```

**Response**:
```json
{
	"message": "Truck updated successfully"
}
```

### Delete Truck

```http
DELETE /api/trucks/delete/{id}
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
{
	"message": "Truck deleted successfully"
}
```

## Location Endpoints

### Create Location

```http
POST /api/locations/create
```

```Header
Authorization: Bearer {token}
```

**Request Body**:
```json
{
	"placeId": "string"
}
```

**Response**:
```json
{
	"message": "Location created successfully"
}
```

### Find All Locations

```http
GET /api/locations/findAll
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
[
	{
		"_id": "string",
		"address": "string",
		"place_id": "string",
		"latitude": number,
		"longitude": number
	},
	{
		"_id": "string",
		"address": "string",
		"place_id": "string",
		"latitude": number,
		"longitude": number
	},
	...
]
```

### Find One Location

```http
GET /api/locations/findOne/{id}
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
{
	"_id": "string",
	"address": "string",
	"place_id": "string",
	"latitude": number,
	"longitude": number
}
```

### Update Location

```http
PATCH /api/locations/update/{id}
```

```Header
Authorization: Bearer {token}
```

**Request Body**:
```json
{
	"placeId": "string"
}
```

**Response**:
```json
{
	"message": "Location updated successfully"
}
```

### Delete Location

```http
DELETE /api/locations/delete/{id}
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
{
	"message": "Location deleted successfully"
}
```

## Order Endpoints

### Create Order

```http
POST /api/orders/create
```

```Header
Authorization: Bearer {token}
```

**Request Body**:
```json
{
	"user": "string",
	"truck": "string",
	"pickup": "string",
	"dropoff": "string"
}
```

**Response**:
```json
{
	"message": "Order created successfully"
}
```

### Find All Orders

```http
GET /api/orders/findAll
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
[
    {
		"_id": "string",
		"user": {
			"email": "string"
		},
		"truck": {
			"_id": "string",
			"year": "string",
			"color": "string",
			"plates": "string"
		},
		"status": "string",
		"pickup": {
			"address": "string",
			"latitude": number,
			"longitude": number
		},
		"dropoff": {
			"address": "string",
			"latitude": number,
			"longitude": number
		},
	},
    {
		"_id": "string",
		"user": {
			"email": "string"
		},
		"truck": {
			"_id": "string",
			"year": "string",
			"color": "string",
			"plates": "string"
		},
		"status": "string",
		"pickup": {
			"address": "string",
			"latitude": number,
			"longitude": number
		},
		"dropoff": {
			"address": "string",
			"latitude": number,
			"longitude": number
		},
	},
	...
]
```

### Find One Order

```http
GET /api/orders/findOne/{id}
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
{
	"_id": "string",
	"user": {
		"_id": "string",
		"email": "string"
	},
	"truck": {
		"_id": "string",
		"year": "string",
		"color": "string",
		"plates": "string"
	},
	"status": "string",
	"pickup": {
		"_id": "string",
		"address": "string",
		"latitude": number,
		"longitude": number
	},
	"dropoff": {
		"_id": "string",
		"address": "string",
		"latitude": number,
		"longitude": number
	},
}
```

### Update Order

```http
PATCH /api/orders/update/{id}
```

```Header
Authorization: Bearer {token}
```

**Request Body**:
```json
{
	"user": "string",
	"truck": "string",
	"pickup": "string",
	"dropoff": "string"
}
```

**Response**:
```json
{
	"message": "Order updated successfully"
}
```

### Delete Order

```http
DELETE /api/orders/delete/{id}
```

```Header
Authorization: Bearer {token}
```

**Response**:
```json
{
	"message": "Order deleted successfully"
}
```