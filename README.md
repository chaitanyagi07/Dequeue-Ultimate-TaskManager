# Deque - The Ultimate Task Manager

Deque is a comprehensive task manager built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It offers powerful features for organizing your day, managing tasks, conducting video conferences, and overseeing projects seamlessly.

## Features

1. *Daily Planning with FullCalendar*
   - Plan your day using an interactive calendar interface.
   - Create events, block time slots, and manage your schedule efficiently.
   - More functionalities of FullCalendar include...

2. *Task Cards with Recursive Embedding*
   - Create task cards to organize your tasks by category (e.g., "Work", "Personal", "Project A").
   - Utilize recursive embedding to break down tasks into subtasks with deep nesting capabilities.

3. *Video Conferencing with Socket*
   - Conduct video conferences directly within the application.
   - Integrated with Socket for real-time communication.

4. *Project Management*
   - Manage projects by creating milestones, assigning tasks, and tracking progress.

## Setup

To set up this project locally, follow these steps:

1. Create a .env file in the root directory of the project.
2. Add the following environment variables to the .env file:
 ```dotenv
ENV_OPTION=your_option_here
ANOTHER_OPTION=another_value

# Example .env file
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
```
3. Install dependencies using npm:
   ```bash
   npm install
4. Run Commands:
  React Vite App
    To run the React Vite app locally, navigate to the root directory of the project in your terminal and execute the following command:
    ```bash
    npm run dev
    ```
   Node Js
     ```bash
     
     nodemon Server.js
