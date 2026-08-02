<p align="center">
  <img src="Screenshots/gamevault-logo@2x.png" width="220">
</p>

<h1 align="center">GameVault</h1>

<p align="center">
Discover. Track. Save.
</p>

## Overview

GameVault is a full-stack web application built for gamers who want a simple way to discover new titles, search across multiple platforms, and manage their favorite games.

The application combines the RAWG Video Games API with a React frontend, Express backend, MongoDB Atlas database, and JWT authentication to create a modern game discovery experience.

## Key Features

### Game Discovery
- Search for games using RAWG
- Browse multiple platforms
- View game information

### User Accounts
- Registration
- Login
- JWT Authentication
- User Profile

### Interface
- Responsive React UI
- Search filters
- Sorting
- Modern design

### Homepage

Browse featured games, search the RAWG database, and quickly navigate through the application

![Homepage](Screenshots/Homepage.png)

### Search

Search thousands of games using the RAWG Video Games API.

![Search](Screenshots/Search.png)

### Search Results

Browse detailed search results complete with ratings, release dates, and supported platforms.

![Search Results](Screenshots/Search_2.png)

### Login

Create an account or securely sign in to access personalized features.

![Login](Screenshots/Login.png)

### User Profile

View your account information and manage your authenticated session.

![Profile](Screenshots/Profile.png)

## Technology Stack

| Layer | Technologies |
|--------|--------------|
| 🎨 Frontend | React, Vite, CSS3, React Icons |
| ⚙️ Backend | Node.js, Express.js |
| 🗄️ Database | MongoDB Atlas, Mongoose |
| 🔐 Authentication | JSON Web Tokens (JWT), bcryptjs |
| 🎮 API | RAWG Video Games Database API |
| 📦 Version Control | Git, GitHub |

GameVault combines a modern React frontend with an Express backend, MongoDB Atlas for persistent storage, JWT authentication for secure user sessions, and the RAWG Video Games API to deliver game discovery and user account functionality.

## Future Improvements

- Favorites database integration
- User game collections
- Advanced search filters
- User avatars
- Recently viewed games
- Dark/Light theme toggle

## Team Members

| Member | Responsibility |
|---------|----------------|
| Alyssa Scott | Frontend development, UI/UX design, React components, authentication integration, responsive styling, project integration |
| Lucas Brown | Express backend, RAWG API integration, API routes, search and filtering logic |
| Francisco Tejeda-Villarreal | JWT authentication, login and registration, authentication middleware |
| Grayson Siver | MongoDB Atlas, Mongoose models, favorites database |


## Local Installation and Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas instance
- [RAWG API key](https://rawg.io/apidocs)

### Backend Setup
- `cd server`
- `npm install`
- Create a `.env` file in `/server` with the following parameters:

| Parameter   | Description                             | Example                                                                                      |
| ----------- | --------------------------------------- | -------------------------------------------------------------------------------------------- |
| `API_KEY`   | RAWG API key                            | 324adwsd3dasdf3tr3q3asjuk63zxf65                                                             |
| `MONGO_URI` | URI link to your MongoDB Atlas instance | mongodb://mongo_db_username:mongo_password@ac-lowthoa-shard-00-00.hmarfvv.mongodb.net:123456 |

- **Atlas Database Setup**
  - Ask a teammate to add you as a database user on the shared GameVault Atlas cluster (or create your own free cluster and share the connection details with the team)
  - In Atlas, go to **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) — required since teammates connect from different networks
  - Go to **Database Access** → create a database user with a username/password (this is separate from your Atlas login)
  - Go to **Connect** → **Drivers** → copy your connection string
  - Paste it into `MONGO_URI` in your `.env`, replacing `<username>` and `<password>` with your database user's credentials
  - **Note:** if you get a `querySrv ECONNREFUSED` error on Windows, your network's DNS may be blocking the `mongodb+srv://` lookup. Either switch your DNS to `8.8.8.8` / `8.8.4.4` in Windows network settings, or use the non-SRV connection string format (`mongodb://host1,host2,host3/...`) available under Atlas's **Connect** → **Drivers** page
  - Once connected, MongoDB collections (`users`, `favorites`) are created automatically on first write — no manual collection setup needed
- start server via `npm start`

### Frontend Setup
- `cd client`
- `npm install`
- `npm install react-icons`
- Start client server: `npm run dev`
- Open browser and copy the displayed in the client console into the address bar. Ex. `http://localhost:5173/`

## API Endpoint Specification Table

| Method | Endpoint                 | Auth Required | Description                                                                     | Request Body Example | Expected Status |
| ------ | ------------------------ | ------------- | ------------------------------------------------------------------------------- | -------------------- | --------------- |
| GET    | /api/rawg/search/:search | No            | Performs search query to RAWG API when input from search bar is received        | N/A                  | 200 OK          |
| GET    | /api/rawg/next           | No            | Performs search query to RAWG API to get the next page of paginated results     | N/A                  | 200 OK          |
| GET    | /api/rawg/prev           | No            | Performs search query to RAWG API to get the previous page of paginated results | N/A                  | 200 OK          |
| GET    | /api/favorites           | Yes        | Returns all favorites from logged in user                                       | N/A                  | 200 OK          |
| POST   | /api/favorites           | Yes        | Adds a game to the logged in user's favorites                                   | { "rawgId": 3498, "title": "GTA V", "coverImage": "..." }             | 201 Created     |
| DELETE | /api/favorites/:id       | Yes        | Removes favorite by database ID                                                 | N/A                  | 200 OK          |

## Academic Project

Developed for: COSC 3351 – Internet Programming

Texas A&M University–Corpus Christi

Summer 2026