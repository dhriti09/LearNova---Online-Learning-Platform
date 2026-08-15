# Run This Project on Windows

See **RUN-WINDOWS.md** for the exact setup.

**Important:** the Atlas database itself does not need to be created manually. Only the Atlas database-user password must be placed in `server/.env`.

---

# Online Learning Platform (MERN)

A course marketplace: instructors can create courses, students can browse and enroll.

- **Frontend:** React (Create React App) + React Router
- **Backend:** Node.js + Express + MongoDB (Mongoose) + JWT auth (Passport)

## Project structure

```
client/   - React frontend
server/   - Express API + MongoDB models
```

## Prerequisites

- Node.js v18+ and npm
- A MongoDB database — either:
  - MongoDB installed locally, or
  - A free MongoDB Atlas cluster (https://www.mongodb.com/cloud/atlas)

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Open `server/.env` and set:
- `DB_URL` — your MongoDB connection string
- `JWT_SECRET` — any long random string (used to sign login tokens)

Start the server:

```bash
npm start
```

You should see `Server running on port 8080.` in the terminal.

## 2. Frontend setup

Open a **second terminal** (leave the server running in the first one):

```bash
cd client
npm install
cp .env.example .env
npm start
```

This opens the app at http://localhost:3000, talking to the API at http://localhost:8080.

## 3. Try it out

1. Go to http://localhost:3000/register and create an **instructor** account.
2. Log in, click **Create Course**, publish a course.
3. Register a second account as a **student** (use a different email, or log out first).
4. Browse **Courses**, open the one you made, click **Enroll**.

## Deploying to Vercel (frontend + API in one project)

The React app cannot talk to `http://localhost:8080` once it is deployed — that
address only exists on your own machine, which is why a deployed build shows
"Registration failed" and "Could not load courses". This repo therefore deploys
the Express API alongside the frontend as a Vercel serverless function
(`api/[...path].js`), so the browser calls `/api/...` on the same domain.

1. In the Vercel project settings, set **Root Directory** to the repository root
   (not `client`). `vercel.json` builds `client/` and outputs `client/build`.
2. Add these **Environment Variables** (Production + Preview):
   - `MONGO_USER`, `MONGO_PASSWORD`, `MONGO_HOST`, `MONGO_DB` — or a single
     `DB_URL` connection string instead
   - `JWT_SECRET`
3. In MongoDB Atlas → **Network Access**, allow `0.0.0.0/0` (Vercel functions do
   not have fixed IPs).
4. Redeploy. `https://<your-app>.vercel.app/api/health` should return
   `{"status":"ok","database":"connected"}`.

Local development is unchanged: `server/npm start` still serves the API on port
8080 and `client/.env` still points at it.

## Notes

- Passwords are hashed with bcrypt before being stored.
- Auth uses JWT: on login/register the server returns a token, the frontend saves it in `localStorage` and sends it on every request that needs it.
- Browsing courses (`GET /api/courses`) is public. Creating/editing/deleting a course and enrolling require login.
- Deploying the frontend to GitHub Pages: `cd client && npm run deploy` (after setting the `homepage` field in `client/package.json` to your GitHub Pages URL).
