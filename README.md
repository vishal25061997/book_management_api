# book_management_api
This server-side application provides endpoints for managing books and user authentication/authorization with documentation of API endpoints in swagger.

## Authentication and Authorization
Users can register and login to access the book management functionalities. JWT tokens are used for authentication, and bcrypt is employed to hash passwords before storing them in the database.

## User Routes

Base Route: /api/users

POST /register: Register a new user.

POST /login: Login a user.


## Book Management Routes
Base Route: api/books

GET /: Get a list of all books.

POST /: Add a new book. Requires authorization.

DELETE /:id: Delete a book by ID. Requires authorization.

PATCH /:id: Update a book by ID. Requires authentication and authorization.

## Endpoints

Register a New User

POST api/users/register

Register a new user by providing a name, email, and password in the request body.


Login User

POST api/users/login

Login a registered user by providing their email and password in the request body.


Get All Books

GET /api/books

Retrieve a list of all books.

Add a New Book

POST /api/books

Add a new book by providing the book details in the request body. Authentication is required.

Delete a Book

DELETE /api/books/:id

Delete a book by its ID. Requires authentication and authorization. Only the user who added the book can perform this action.

Update a Book

PATCH /api/books/:id

Update a book by its ID. Requires authentication and authorization. Only the user who added the book can perform this action.

## Documentation with Swagger
Swagger documentation is available for the API. Follow these steps to run the server and access the documentation:

## Clone this repository.
https://github.com/vishal25061997/book_management_api.git
Install dependencies using npm install.

Set up your environment variables in a .env file.

Start the server using npm run server.
npm start

Access Swagger documentation at http://localhost:4500/docs.


## Technologies Used

Node.js

Express.js

mySQL (database)

JSON Web Tokens (JWT) for authentication

Bcrypt for password hashing
