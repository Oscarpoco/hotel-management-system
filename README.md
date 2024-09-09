#Hotel Management System - Admin Site

This project is the admin-side application for a hotel management platform. It provides an interface for administrators to manage hotels, monitor bookings, view analytics, and handle user reviews. The application is built using React and leverages various libraries for state management, data visualization, and authentication.

Getting Started
This project was bootstrapped with Create React App.

Prerequisites
Ensure you have Node.js and npm installed on your machine. You can download them from the Node.js official website.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload if you make edits.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

Project Overview
The admin-side application includes various functionalities for hotel management. Below is an overview of the key features:

1. Dashboard and Analytics
Provides a comprehensive dashboard for monitoring hotel performance.
Integrates recharts for data visualization, including charts for booking trends, revenue, and user activity.
2. User and Booking Management
Allows administrators to manage user accounts, including viewing, editing, and deleting users.
Provides features to manage hotel bookings, including viewing current and past reservations.
3. Hotel and Review Management
Administrators can add, edit, and remove hotels from the platform.
Enables managing user reviews, including approving, rejecting, or deleting reviews.
4. State Management
Uses redux and react-redux for global state management.
Utilizes redux-thunk middleware for handling asynchronous operations, especially with Firebase and APIs.
redux-persist is used to persist the Redux state across sessions.
5. Authentication and Security
Integrated with Firebase for authentication and real-time data storage.
Uses Firebase's authentication services to manage admin login and permissions.
6. Testing
The application includes testing utilities with @testing-library/react, @testing-library/jest-dom, and @testing-library/user-event.
Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Dependencies
Below is a list of the key dependencies used in this project:

React: ^18.3.1
Redux: ^5.0.1
React-Redux: ^9.1.2
Redux Thunk: ^3.1.0
Redux Persist: ^6.0.0
Firebase: ^10.13.1
Recharts for data visualization: ^2.12.7
Testing libraries: @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
React Icons for icons: ^5.3.0
Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

npm run build fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify