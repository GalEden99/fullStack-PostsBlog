# Posts Blog

## Introduction

Full-Stack assignment for implementing frontend and backend for a web application that can post a new note, edit, and delete posts.

### Tools
1. MongoDB Atlas for the database.
2. Implement backend using Express to support CRUD operations.
3. Implement a logger middleware logging to `backend/log.txt`.
4. Enable CORS in the backend.
5. Use `.env` file for environment variables.
6. Use Nodemon for automatic backend restarts.
7. Use Postman for testing.

## Prerequisites

1. MongoDB Atlas account:
    - Follow [Saving Data to MongoDB](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db) to set up your Atlas account.
    - Create a new database and get the connection string.

2. `.env` file:
    - Create a `.env` file in the `backend` directory.
    - Add the MongoDB connection string:
      ```
      MONGODB_CONNECTION_URL=<your_connection_string>
      ```

## Installing and Running

1. Clone the repository:
    ```
    git clone <your_submitted_github_repo>
    ```

2. Navigate to the cloned directory:
    ```
    cd <cloned_dir>
    ```

3. Install frontend dependencies:
    ```
    cd frontend
    npm install
    ```

4. Start the frontend server (configured to default port 3000):
    ```
    npm run dev
    ```

5. Copy the `.env` file into the `backend` directory.

6. Install backend dependencies:
    ```
    cd ../backend
    npm install
    ```

7. Start the backend server (configured to default port 3001):
    ```
    node index.js
    ```

## Screen Shots
| | |
|:-------------------------:|:-------------------------:|
|<img style="max-width:200px; width:100%"  src="https://github.com/GalEden99/fullStack-PostsBlog/blob/master/images/first%20page.png" alt="SreenShot1" >|<img style="max-width:200px; width:100%"  src="https://github.com/GalEden99/fullStack-PostsBlog/blob/master/images/edit%20last%20page.png" alt="SreenShot1" >
|<img style="max-width:200px; width:100%"  src="https://github.com/GalEden99/fullStack-PostsBlog/blob/master/images/new%20post.png" alt="SreenShot3" >|<img style="max-width:200px; width:100%"  src="https://github.com/GalEden99/fullStack-PostsBlog/blob/master/images/dark%20mode.png" alt="SreenShot4" >
