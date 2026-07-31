# GameVault - Full-Stack Video Game Search Application
GameVault is a full-stack web application that allows gamers to create an account, search for games of all the current platforms, them to a list of favorites.

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

- {INSERT ADDITIONAL DB SETUP STEPS HERE}
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
| GET    | /api/favorites           | ??????        | ???????                                                                         | ????????             | 200 OK          |
| POST   | /api/favorites           | ??????        | ???????                                                                         | ????????             | 201 Created     |
| DELETE | /api/favorites/:id       | ??????        | ???????                                                                         | ????????             | 200 OK          |
