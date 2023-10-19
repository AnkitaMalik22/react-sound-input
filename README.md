

## REACT SOUND INPUT

This is a React.js web application that allows users to fill out a form using voice input. 
The application includes seven fields for capturing information such as First Name, Last Name, State, District, Village, PAN Number, and Aadhaar Number. 
Users can use voice commands to input data into these fields.

 Deployment Link - https://react-sound-input.onrender.com/


## Technologies Used

**Frontend**: React.js

**Voice Recognition:** : react-speech-recognition

**Styling**: CSS 

**Backend:** Node.js, Express.js

**Database:** MongoDB


## Steps to Run Locally

 ### **Client Application:**

- Change Directory to Client:

```bash

cd client

```
- Install Dependencies:

```bash

npm install

```
- Start the Client Application:

```bash

npm start
```
This will launch the React development server. Open your browser and go to http://localhost:3000 to access the client application.

### Server Application:

- Open Another Terminal:

Open a new terminal window to keep the client server running, and navigate to the root of your project.

- Change Directory to Server:

```bash

cd server

```
- Install Dependencies:

```bash

npm install

```
- Setup Environment Variable for MongoDB URI:

Create a .env file in the server directory and set the MongoDB URI. Example:

```bash

MONGO_URI=mongodb://localhost:27017/your-database-name

```
Run the Server Application:

```bash

npm run dev

```
This will start the server using Nodemon for automatic restarts during development.

Ensure that MongoDB is installed and running locally for the server to connect to the database.
