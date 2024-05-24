# Movie Explorer

## Description

This is a web application that allows users to search for movies by title and filter by genre. It uses the OMDb API to fetch movie data and displays the search results in a responsive grid layout. Users can click on a movie poster to view more details about the selected movie.

## Live Demo

You can check out the live demo of the Movie Explorer app at: [Movie Explorer App](https://tinyurl.com/Movie-Explorer-App)

## Technologies Used

- **Frontend:**
  - React.js
  - React Router
  - Axios (for making HTTP requests)
  - Bootstrap (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - Axios (for making HTTP requests)
  - CORS (for handling Cross-Origin Resource Sharing)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- OMDb API key (obtain it from https://www.omdbapi.com/apikey.aspx)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-explorer.git

2. Navigate to the project directory:
   ```bash
   cd movie-explorer

3. Install the dependencies for the backend:
   ```bash
   cd backend
   npm install

4. Create a .env file in the backend directory and add your OMDb API key:
   ```env
   API_KEY=your-omdb-api-key

5. Install the dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install

### Running the Application

1. Start the backend server:
   ```bashcd
   ../backend
   npm start
   
The server will start running at http://localhost:5000.

2. In a separate terminal, start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   
The React app will open in your default browser at http://localhost:3000.

### Deployment
#### Backend

1. Build the backend server:
   ```bash
   cd backend
   npm install

Deployed the backend as a service on render.com.

#### Frontend

1. Build the React app for production:
   ```bash
   cd frontend
   npm run build

Deploy the dist folder as a static site on render.com.
