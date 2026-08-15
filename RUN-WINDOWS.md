# Online Learning Platform — Windows setup

## 1. MongoDB Atlas
The project is already configured for the existing Atlas cluster shown in the setup:
- Cluster: `dhriti09`
- Database user: `dhritiyadav0919_db_user`
- Host: `dhriti09.p91hsxt.mongodb.net`
- Database: `online-learning-platform`

You do **not** need to create the database manually. MongoDB creates it when the first document is saved.

## 2. One thing you must fill
Open:

`server/.env`

Replace only:

`PASTE_YOUR_ATLAS_DATABASE_USER_PASSWORD_HERE`

with the password of the Atlas **database user** `dhritiyadav0919_db_user`.

The code encodes special characters in the password automatically, so you do not need to manually URL-encode it.

## 3. Backend
Open a terminal in the project root:

```powershell
cd server
npm install
npm start
```

You should see:

`Connected to MongoDB Atlas.`

and:

`Server running on http://localhost:8080`

Test:

`http://localhost:8080/api/health`

Expected JSON contains:

`"status": "ok"` and `"database": "connected"`.

## 4. Frontend
Open a second terminal:

```powershell
cd client
npm install
npm start
```

Open:

`http://localhost:3000`

## 5. Test the database
Register a student or instructor. That first successful registration creates the database and `users` collection automatically.

Then create a course as an instructor. This creates the `courses` collection automatically.
