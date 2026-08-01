
# GameVault - Full-Stack Video Game Search Application
GameVault is a full-stack web application that allows gamers to create an account, search for games of all the current platforms, then add them to a list of favorites.

## Features

- Search for games using the RAWG Video Games API
- Filter games by genre, platform, release year, and rating
- Sort search results by title, release date, and rating
- Create a user account
- Secure user authentication with JWT
- Save favorite games
- Responsive React interface
- User profile page

## Technologies

### Frontend
- React
- Vite
- CSS
- React Icons

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT
- bcryptjs

### API
- RAWG Video Games API

### Frontend Features

- Responsive React interface built with reusable components.
- Modern dark-themed GameVault UI with consistent styling.
- Search bar and filtering interface.
- Featured Games section.
- Navigation bar and footer shared across pages.
- Login and registration pages.
- User profile page displaying logged-in user information.
- Sparkle cursor visual effect throughout the site.

### Authentication

- User registration and login connected to the Express backend.
- JWT authentication implemented.
- Logged-in user information stored in Local Storage.
- Secure logout functionality.
- Profile page loads authenticated user information.

## Future Improvements

- Favorites database integration
- User game collections
- Advanced search filters
- User avatars
- Recently viewed games
- Dark/Light theme toggle

### Frontend Design

The interface was built using reusable React components with semantic HTML elements where appropriate to improve readability, organization, and accessibility.

## Team Members

| Member | Responsibility |
|---------|----------------|
| Alyssa Scott | Frontend, UI/UX, React Components, Integration |
| Lucas Brown | Backend API, RAWG Integration |
| Francisco Tejeda-Villarreal | Authentication & JWT |
| Grayson Siver | MongoDB Database |


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
| GET    | /api/favorites           | ??????        | Returns all favorites from logged in user                                       | N/A                  | 200 OK          |
| POST   | /api/favorites           | ??????        | Adds a game to the logged in user's favorites                                   | { "rawgId": 3498, "title": "GTA V", "coverImage": "..." }             | 201 Created     |
| DELETE | /api/favorites/:id       | ??????        | Removes favorite by database ID                                                 | N/A                  | 200 OK          |
