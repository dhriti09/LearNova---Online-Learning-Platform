---
name: testing-learnova
description: How to run and end-to-end test the Learnova MERN online learning platform (Express/Mongoose server + CRA client) locally, including data setup for student/instructor flows.
---

# Testing Learnova locally

## Services

1. MongoDB (Docker):
   `docker run -d --name mongo-test -p 27017:27017 mongo:7` (reuse the container if it already exists: `docker start mongo-test`).
2. `server/.env` must contain:
   ```
   DB_URL=mongodb://localhost:27017/online-learning-platform
   JWT_SECRET=devtestsecret
   PORT=8080
   ```
3. Backend: `cd server && node index.js` (no nodemon required).
   Health check: `curl -s localhost:8080/api/health` -> `{"status":"ok","database":"connected"}`.
4. Frontend: `cd client && BROWSER=none npm start` -> http://localhost:3000.
   There is no CRA proxy; the client calls `http://localhost:8080/api` directly (`client/src/services/api.js`), so the backend must be up and CORS enabled.

## Test data — the DB is usually empty

There is no seed script. Create data through the UI:
- Instructor: `/register?role=instructor` (the Instructor role card is preselected via the `role` query param) -> auto-redirects to `/dashboard`.
- Create a course: navbar "Create Course" -> fill Title/Description/Price, "Add Lesson" for each lesson, "Publish Course". You are redirected to the course detail page.
- Student: log out from the avatar menu (top right) -> `/register` -> Student role card -> submit.
- Enroll: `/courses` -> "View course" -> "Enroll Now". Success shows a toast and the button is replaced by an "Already Enrolled" banner.
- Instructors cannot enroll (the enroll card shows "Instructor accounts can't enroll in courses.") — always use a separate student account.

## Gotchas

- The Create Course form is long; after typing into lesson fields, scroll with the mouse over the form body before clicking "Publish Course". A misplaced click near the footer can navigate away and silently discard the whole form — re-verify the URL is still `/create-course` before submitting.
- Auth state lives in `localStorage` (`token`, `user`); `AuthContext.refreshUser()` re-fetches `GET /api/user/me` and rejects on failure so pages can render error states.
- To exercise dashboard error states, kill the backend (`pkill -f "node index.js"`) and reload; restart with `cd server && nohup node index.js > /tmp/server.log 2>&1 &`.
- Expected benign console noise: React Router v7 future-flag warnings and the React DevTools info line. Anything else is a real issue.
- Watch for literal `\uXXXX` escape sequences rendered as text: several components put JS escapes directly in JSX text nodes (where they are NOT interpreted). Known offenders at the time of writing: `client/src/pages/Dashboard.js` greeting emoji and `client/src/pages/CreateCourse.js` price label. Check any newly-added JSX text for this pattern.

## Devin Secrets Needed

None — everything runs locally with a throwaway JWT secret.
