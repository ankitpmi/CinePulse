# CinePulse (MERN Movies App)

This project is a MERN-based movie application:

- Frontend: React + Vite + Redux Toolkit
- Backend: Express + Mongoose (MongoDB) + JWT authentication (httpOnly cookie)
- Features: browse movies/genres, add movie reviews, and admin CRUD for movies/genres/users

## Prerequisites

- Node.js installed
- MongoDB running (local or reachable via `MONGO_URI`)

## Environment variables

Create a `.env` file in the project root (`/MERN-Movies-App/.env`) with:

```bash
PORT=3000
MONGO_URI='mongodb://127.0.0.1:27017/moviesApp'
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
```

## Install dependencies

Backend (root):

```bash
npm install
```

Frontend:

```bash
cd frontend
npm install
```

## Run the app

Run full stack (backend + frontend concurrently):

```bash
npm run fullstack
```

Backend only:

```bash
npm run backend
```

Frontend only:

```bash
cd frontend
npm run dev
```

## URLs & proxy notes

- Backend runs on `http://localhost:3000`
- Frontend runs on Vite (default: `http://localhost:5173`)
- The Vite dev server proxies:
  - `/api/` to `http://localhost:3000`
  - `/uploads/` to `http://localhost:3000`

## API Overview

Base path: `/api/v1`

### Users & Auth

Authentication uses a JWT stored in an httpOnly cookie named `jwt`.

- `POST /api/v1/users/`
  - Body: `{ "username": string, "email": string, "password": string }`
  - Creates a new user and sets the `jwt` cookie
- `POST /api/v1/users/auth`
  - Body: `{ "email": string, "password": string }`
  - Logs in and sets the `jwt` cookie
- `POST /api/v1/users/logout`
  - Clears the `jwt` cookie
- `GET /api/v1/users/profile` (auth required)
  - Returns: `{ _id, username, email }`
- `PUT /api/v1/users/profile` (auth required)
  - Body: `{ "username"?: string, "email"?: string, "password"?: string }`
- `GET /api/v1/users/` (admin only)
  - Returns all users

### Genres

- `GET /api/v1/genre/genres`
  - Returns all genres
- `GET /api/v1/genre/:id`
  - Returns one genre by Mongo `_id`
- `POST /api/v1/genre/` (admin only)
  - Body: `{ "name": string }`
- `PUT /api/v1/genre/:id` (admin only)
  - Body: `{ "name": string }`
- `DELETE /api/v1/genre/:id` (admin only)

### Movies

Public routes:

- `GET /api/v1/movies/all-movies`
  - Returns all movies (no explicit sorting)
- `GET /api/v1/movies/specific-movie/:id`
- `GET /api/v1/movies/new-movies` (latest 10)
  - Sorted by newest first (`createdAt` desc)
- `GET /api/v1/movies/top-movies` (top by `numReviews`, 10)
  - Sorted by highest reviews first (`numReviews` desc)
- `GET /api/v1/movies/random-movies` (10 random)

Reviews:

- `POST /api/v1/movies/:id/reviews` (auth required)
  - Body: `{ "rating": number, "comment": string }`

Admin routes:

- `POST /api/v1/movies/create-movie` (auth + admin)
  - Body should match `Movie` fields (e.g. `name`, `image`, `year`, `genre`, `detail`, `cast`)
- `PUT /api/v1/movies/update-movie/:id` (auth + admin)
- `DELETE /api/v1/movies/delete-movie/:id` (auth + admin)
- `DELETE /api/v1/movies/delete-comment` (auth + admin)
  - Body: `{ "movieId": string, "reviewId": string }`

### Uploads

- `POST /api/v1/upload`
  - `multipart/form-data` with a single file field named `image`
  - Accepts: `jpg`, `png`, `webp`
  - Saves files to `uploads/` and returns an `image` path
- Static hosting: files are served at `/uploads/...`

## Notes

- Because the JWT is stored in a `sameSite: "strict"` httpOnly cookie, requests should come from the same site origin (the Vite proxy setup is designed to help with this during development).
