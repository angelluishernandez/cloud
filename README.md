# API Rest application created for a CloudAppi Challenge


## Where is it deployed? 

This API can be found at: https://cloudappi-challenge.herokuapp.com

Please bear in mind that heroku servers take some time before they can be operative

## How to run locally?

npm start


## How to run the tests? 

npm test


# REST API

This REST API uses mongoDB and mongoose as its DB. 
I know it wasn't necessary to implement a DB but I think is a nice touch. 

Also there is another branch in which the same API was implemented using node's native file-system. 
No test are provided for this though. 


# API REQUESTS

# Test if api is working

**URL** : `/`

**Method** : `GET`


## Success Response

**Code** : `200 OK`

**Content **


```json
{
   "Hello, the API is working"
}
```

# GET all users

**URL** : `/users`

**Method** : `GET`


## Success Response

**Code** : `200 OK`

**Content **

It returns an array of all the users in the DB.

```json
{
    {
        "address": {
            "id": "5ee5f5ec00ec85002439d6e7",
            "street": "Some street",
            "state": "Some state",
            "city": "Some city",
            "zip": "45AB"
        },
        "_id": 1,
        "name": "Luis",
        "email": "ewcxnjvbxjbvgwgww@a.com",
        "__v": 0
    }
}
```

## Error Response

**Condition** : If there are no users in the database.

**Code** : `202`

**Content example** :

```json
{
    "No users found"
}
```


# POST a user

**URL** : `/createUsers`

**Method** : `POST`


## Success Response

**Code** : `201 CREATED`


## Error Response

**Condition** : If there is no email or name on the request body

**Code** : `405`

**Content example** :

```json
{
    "Invalid input"
}
```


# GET one user

**URL** : `/getusersById/:userId`

**Method** : `GET`


## Success Response

**Code** : `200 CREATED`

It returns an object with the requested user.

```json
{
    {
        "address": {
            "id": "5ee5f5ec00ec85002439d6e7",
            "street": "Some street",
            "state": "Some state",
            "city": "Some city",
            "zip": "45AB"
        },
        "_id": 1,
        "name": "Luis",
        "email": "ewcxnjvbxjbvgwgww@a.com",
        "__v": 0
    }
}
```


## Error Response

**Condition** : If the id provided is not a number(i.e. not a valid ID)

**Code** : `400`

**Content example** :

```json
{
    "Invalid id"
}
```

**Condition** : If user with id provided cannot be found or doesn't exists

**Code** : `404`

**Content example** :

```json
{
    "User not found"
}
```

# PUT one user

**URL** : `/updateUsersById/:userId`

**Method** : `PUT`


## Success Response

**Code** : `200 OK`



## Error Response

**Condition** : If the id provided is not a number(i.e. not a valid ID)

**Code** : `400`

**Content example** :

```json
{
    "Invalid id"
}
```

**Condition** : If user with id provided cannot be found or doesn't exists

**Code** : `404`

**Content example** :

```json
{
    "User not found"
}
```

# DELETE one user

**URL** : `/deleteUserById/:userId`

**Method** : `DELETE`


## Success Response

**Code** : `202 OK`



## Error Response

**Condition** : If the id provided is not a number(i.e. not a valid ID)

**Code** : `400`

**Content example** :

```json
{
    "Invalid id"
}
```

**Condition** : If user with id provided cannot be found or doesn't exists

**Code** : `404`

**Content example** :

```json
{
    "User not found"
}
```