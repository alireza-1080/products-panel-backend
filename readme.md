Products Panel Backend
This is the backend for a products management panel. It provides a RESTful API for performing CRUD (Create, Read, Update, Delete) operations on products. The project is built with Node.js, Express, and TypeScript, using Prisma as an ORM for MongoDB.

✨ Features

RESTful API: A complete API for managing products.

CRUD Operations: Supports creating, reading, updating, and deleting products.

Validation: Includes input validation for creating and updating products.

Error Handling: Proper error handling for database and client-side errors.

🛠️ Stack

Framework: Express.js

Language: TypeScript

Database: MongoDB

ORM: Prisma

Middleware: CORS, Helmet, Compression

🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You need to have Node.js and npm installed on your machine. You also need a running instance of MongoDB.

Installation
Clone the repository:

Bash

git clone https://github.com/alireza-1080/products-panel-backend.git
cd products-panel-backend
Install dependencies:

Bash

npm install
Set up environment variables:
Create a .env file in the root of the project and add the following variables:

Code snippet

PORT=3000
MONGODB_URI=your_mongodb_connection_string
You can refer to the .sample.env file for an example.

Push the database schema:
This will sync your Prisma schema with the database.

Bash

npm run db:push
Running the Development Server
Once the dependencies are installed and the environment is configured, you can run the development server:

Bash

npm run dev
This will start the development server at http://localhost:3000 (or the port you specified in your .env file). The server will automatically restart when you make changes to the code.

📜 Scripts

npm run dev: Starts the development server with live reloading.

npm run build: Builds the application for production.

npm run start: Starts a production server.

npm run lint: Lints the project files.

npm run format: Formats the code using Prettier.

npm run db:studio: Opens the Prisma Studio to view and edit your data.
