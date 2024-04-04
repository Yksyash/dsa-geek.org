# leetcode_clone

This platform provides users with a comprehensive environment for practicing coding problems and improving their programming skills.

## Features

- **Interactive Coding Environment**: Users can access an interactive coding environment with syntax highlighting, code editor, and real-time feedback for practicing coding problems.
  
- **Problem Repository**: The platform offers a repository of coding problems across various difficulty levels and categories, allowing users to select challenges based on their skill level and interests.

- **Secure Authentication**: Implemented secure user authentication using JSON Web Tokens (JWT) and bcrypt.js for password hashing.

## Technologies Used

- **Frontend**: React.js, HTML5, CSS3, JavaScript (ES6+)
  
- **Backend**: Node.js, Express.js, MongoDB (for data storage), RESTful APIs
  
- **Authentication**: JSON Web Tokens (JWT), bcrypt.js
  
- **Messaging**: RabbitMQ (for message queuing and processing)
  
- **Containerization**: Docker (for containerizing the run time applications)
  
- **Deployment**: Deployed the application using Docker containers on Amazon Web Services (AWS).

## Getting Started

- **Requirements** : To be able to setup the project locally you need nodejs and Docker installed on your machine and a local/cloud instance of Mongodb   
                     and Rabbitmq.

To get started with the Online Coding Platform, follow these steps:

1. Clone the repository:

2. Use the Docker build Command to build the images for language runtimes using the docker files inside server/runtimes.

3. Seed the sample data provide in server/SampleData into your MongoDB instance and start the MongoDB server/service.

4. Start your Rabbitmq server/service.

5. Navigate to client directory and run "npm install" to install the dependencies and "npm run dev" to start the client.

6. Navigate to server directory provide the values for enviroment variables in the .env file.

7. Run "npm install" to install the dependencies and "npm start_sever" to start the server.

## Contributions/Suggesitons

The respositry is open to contributions and or feedback from the community. Please commit your changes in the "public" branch and create a pull request.
   
