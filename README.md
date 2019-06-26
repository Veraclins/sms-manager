# sms-manager

SMS manager is an sms management platform for sending and receiving messages between users. It has a simple API which makes sending and reading messages easy.

## Installation

To run the app locally, setup a local development environment. Ensure that [`Nodejs`](https://nodejs.org/en/download/) and [`PostgreSQL`](https://www.postgresql.org/download/) are installed on your machine.

- clone the app `git clone git@github.com:Veraclins/sms-manager.git`
- move into the folder and install dependencies `cd sms-manager && yarn`
- create the database `createdb sms-manager`
- run migrations `yarn db:migrate`
- run the app in dev mode (with auto-refresh using [nodemon](https://nodemon.io/)) `yarn dev`
- Or build and run `yarn build && yarn start`
- Visit `http://localhost:4000` to access the app. Note: `4000` is the port number and can be configured by setting the `PORT` variable in your .env file.

## Features/Endpoints

The API has the following features/endpoints:

**Create a contact.**

To create a contact, send a `post` request to `/contact` with `name` and `phoneNumber`. Note: `phoneNumber` must be ten digit numbers starting with `0`.

Response:

```JSON
{
    "status": "success",
    "message": "Contact created successfully",
    "data": {
        "id": 6,
        "name": "Jane",
        "phoneNumber": "0995926464",
        "updatedAt": "2019-06-26T21:05:47.396Z",
        "createdAt": "2019-06-26T21:05:47.396Z"
    }
}
```

**Fetch all contacts.**

To fetch all the available contacts, send a `get` request to `/contacts`,

Response:

```JSON
{
    "status": "success",
    "message": "Contacts fetched successfully",
    "data": [
        {
            "id": 3,
            "name": "Sunday",
            "phoneNumber": "0898946464",
            "createdAt": "2019-06-26T20:43:05.108Z",
            "updatedAt": "2019-06-26T20:43:05.108Z"
        },
        {
            "id": 4,
            "name": "Moses",
            "phoneNumber": "0898926464",
            "createdAt": "2019-06-26T20:43:16.756Z",
            "updatedAt": "2019-06-26T20:43:16.756Z"
        },
        {
            "id": 5,
            "name": "Jane",
            "phoneNumber": "0998926464",
            "createdAt": "2019-06-26T20:43:27.879Z",
            "updatedAt": "2019-06-26T20:43:27.879Z"
        }
    ]
}
```

**Fetch contact by name.**

You can fetch all the contact with the same name by supplying a name query string. E.g. `/contacts?name=Jane`

Response:

```JSON
{
    "status": "success",
    "message": "Contacts fetched successfully",
    "data": [
        {
            "id": 5,
            "name": "Jane",
            "phoneNumber": "0998926464",
            "createdAt": "2019-06-26T20:43:27.879Z",
            "updatedAt": "2019-06-26T20:43:27.879Z"
        },
        {
            "id": 6,
            "name": "Jane",
            "phoneNumber": "0995926464",
            "createdAt": "2019-06-26T21:05:47.396Z",
            "updatedAt": "2019-06-26T21:05:47.396Z"
        },
        {
            "id": 7,
            "name": "Jane",
            "phoneNumber": "0805928464",
            "createdAt": "2019-06-26T21:11:14.634Z",
            "updatedAt": "2019-06-26T21:11:14.634Z"
        }
    ]
}
```

**Get a contact by phone number.**

You can get a contact by passing the phone number as a parameter `/contacts/0998926464`. This also returns all the sent and received messages as shown below.

```JSON
{
    "status": "success",
    "message": "Contact fetched successfully",
    "data": {
        "id": 5,
        "name": "Jane",
        "phoneNumber": "0998926464",
        "createdAt": "2019-06-26T20:43:27.879Z",
        "updatedAt": "2019-06-26T20:43:27.879Z",
        "sent": [],
        "received": [
            {
                "id": 9,
                "senderId": 3,
                "message": "Hello!"
            },
            {
                "id": 8,
                "senderId": 4,
                "message": "What I think?"
            }
        ]
    }
}
```

**Delete contact.**

To delete a contact just send a `delete` request passing the phone number as a parameter. It returns 1 if the delete is successful.

**Send an sms.**

To send an sms, make a `post` request to `/sms` with `senderId`, `receiverId` and `message`. Note: `senderId` and `receiverId` must numbers and the message cannot be more than 200 characters.

Response:

```JSON
{
    "status": "success",
    "message": "Message sent successfully",
    "data": {
        "id": 11,
        "senderId": 4,
        "receiverId": 3,
        "message": "I love building awesome software!",
        "updatedAt": "2019-06-26T21:28:38.420Z",
        "createdAt": "2019-06-26T21:28:38.420Z",
        "status": "unread"
    }
}
```

**Read an sms.**

To read an sms, make a `get` request to `/sms` passing the id of the message as parameter. This will also include the name and phone number of the sender and the receiver.

Response:

```JSON
{
    "status": "success",
    "message": "Message fetched successfully",
    "data": {
        "id": 8,
        "senderId": 4,
        "receiverId": 5,
        "message": "What I think?",
        "status": "read",
        "createdAt": "2019-06-26T20:44:02.306Z",
        "updatedAt": "2019-06-26T20:45:39.214Z",
        "sender": {
            "name": "Moses",
            "phoneNumber": "0898926464"
        },
        "receiver": {
            "name": "Jane",
            "phoneNumber": "0998926464"
        }
    }
}
```

**Fetch all sms's.**

To fetch all available messages send a  `get` request to `/sms`.

Response:

```JSON
{
    "status": "success",
    "message": "Messages fetched successfully",
    "data": [
        {
            "id": 9,
            "senderId": 3,
            "receiverId": 5,
            "message": "Hello!",
            "status": "unread",
            "createdAt": "2019-06-26T20:44:15.129Z",
            "updatedAt": "2019-06-26T20:44:15.129Z"
        },
        {
            "id": 10,
            "senderId": 4,
            "receiverId": 3,
            "message": "Interesting!",
            "status": "read",
            "createdAt": "2019-06-26T20:44:28.773Z",
            "updatedAt": "2019-06-26T20:44:28.773Z"
        },
    ]
}
```

You can also get all messages sent by a user or received by a user by passing the user's id as `senderId` or `receiverId` query strings.
