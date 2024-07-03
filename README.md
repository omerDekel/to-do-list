# To Do List Application

This is a frontend task management web application. The application uses redux for state management in React.

## Prerequisites

- [Node.js](https://nodejs.org/) (with npm)

## Frontend Setup

### 1. Clone the Repository

git clone https://github.com/omerDekel/to-do-list.git
cd task-management-app
### 2. Configure the backend url
change the BASE_URL value accordingly in Constants.js src/constants

### 3. Navigate to the Frontend Directory

cd ../task-management-app
### 4. Install Dependencies

npm install
### 5. Start the React Application

npm start
The React application should now be running at http://localhost:3000.

### Project Structure
* src/components: Contains React components.
* src/managers: Contains logic managers
        src/managers/redux: Contains Redux store and slices.
        src/managers/axios: Configures and manages Axios for API requests.
* src/constants: Contains global constants.
* src/enums: Contains global enums.
* src/entities: Contains definition of objects used in the application.
* State Management
    Using Redux
    Store Configuration: The store is configured in src/managers/redux/store.js.
    Task Slice: The task slice is defined in src/managers/redux/slices/taskSlice.js.