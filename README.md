# BookReviewAPI

This is a backend project built as part of an assessment assigned by the Bileasy team. The purpose of this project is to build a basic Book Review API that supports user authentication, book management, and review functionality. The API is built using Node.js, Express.js, and MongoDB.

This project helped me understand how to organize code in a modular structure and implement RESTful APIs with proper authentication and authorization. I have developed it by following the general coding practices I have learned during my course and self-learning journey.

## Project Features

- User registration and login system using JWT
- Secure routes that require authentication
- CRUD operations for books (Create, Read, Update, Delete)
- Ability to add and delete reviews for books
- Separate route files and controllers to keep the code clean

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Dotenv for environment variables

## How to Run This Project

1. Clone this repository:
git clone https://github.com/Mirthinti/BookReviewAPI.git

csharp
Copy code

2. Navigate into the project folder:
cd BookReviewAPI

markdown
Copy code

3. Install the dependencies:
npm install

pgsql
Copy code

4. Create a `.env` file in the root folder and set the following variables (you can refer to `.env.example`):
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

markdown
Copy code

5. Run the server:
npm start

markdown
Copy code

The API will be available at `http://localhost:5000`.

## API Endpoints Overview

### Auth Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Book Routes

- `GET /api/books` - Get all books
- `POST /api/books` - Create a new book
- `GET /api/books/:id` - Get a book by ID
- `PUT /api/books/:id` - Update a book by ID
- `DELETE /api/books/:id` - Delete a book by ID

### Review Routes

- `POST /api/reviews/:bookId` - Add a review to a book
- `DELETE /api/reviews/:bookId/:id` - Delete a specific review from a book

## Folder Structure

- `controllers/` - Contains all controller logic
- `routes/` - Defines route files for different resources
- `models/` - Contains Mongoose schemas for User, Book, and Review
- `middleware/` - Middleware for authentication
- `server.js` - Entry point of the application

## Conclusion

This project gave me practical experience in building an API and handling user authentication in Node.js. I tried to follow proper structure and naming so that it is understandable. I am thankful to the Bileasy team for assigning this project and giving me the opportunity to learn.

## Developer

**Name:** Sai Krishna  
**GitHub:** [https://github.com/Mirthinti](https://github.com/Mirthinti)  
**Project Repository:** [BookReviewAPI](https://github.com/Mirthinti/BookReviewAPI)
