# 📚 Online Learning Platform(MERN)

A modern and responsive **Online Learning Platform** built with the **MERN Stack**. It allows instructors to create and publish courses, while students can browse available courses and enroll in them through an easy-to-use web interface.

---

# ✨ Features

* 👨‍🏫 Instructor Registration & Login
* 👨‍🎓 Student Registration & Login
* 🔐 JWT Authentication
* 📚 Browse Available Courses
* ➕ Create & Publish Courses
* ✏️ Edit Courses
* 🗑️ Delete Courses
* 📖 Course Enrollment
* 🎯 Student Course Access
* 👤 Role-Based Access
* 🔒 Password Hashing with bcrypt
* 📊 Dashboard
* 📱 Responsive UI
* ⚡ Fast & Lightweight
* ☁️ Vercel Ready
* 🗄️ MongoDB Atlas Support

---

# 🛠️ Tech Stack

| Technology       | Usage               |
| ---------------- | ------------------- |
| ⚛️ React         | Frontend            |
| 🛣️ React Router | Client-side Routing |
| 🟢 Node.js       | Backend Runtime     |
| 🚂 Express.js    | REST API            |
| 🍃 MongoDB       | Database            |
| 🦫 Mongoose      | MongoDB ODM         |
| 🔐 JWT           | Authentication      |
| 🔒 bcrypt        | Password Hashing    |
| 🎨 CSS           | UI Styling          |
| ☁️ Vercel        | Deployment          |

---

# 📂 Project Structure

```text
Online-Learning-Platform/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── .env.example
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── api/
│   ├── package.json
│   └── .env.example
│
├── vercel.json
├── RUN-WINDOWS.md
└── README.md
```

---

# 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/dhriti09/Online-Learning-Platform.git
```

### Go to Project Folder

```bash
cd Online-Learning-Platform
```

---

# ⚙️ Backend Setup

Open a terminal and run:

```bash
cd server
npm install
```

Create a `.env` file using `.env.example`:

```bash
cp .env.example .env
```

On Windows, you can also create the `.env` file manually.

Add your MongoDB connection details and JWT secret:

```env
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
```

Start the backend:

```bash
npm start
```

The API will run at:

```text
http://localhost:8080
```

---

# 💻 Frontend Setup

Open a **second terminal** and run:

```bash
cd client
npm install
```

Create the frontend `.env` file:

```bash
cp .env.example .env
```

Then start the React application:

```bash
npm start
```

The application will open at:

```text
http://localhost:3000
```

---

# 🗄️ MongoDB Setup

The project supports **MongoDB Atlas**.

You do **not** need to manually create the database. MongoDB creates the database when the application first writes data.

You only need to:

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Add the user's password to `server/.env`.
4. Add the MongoDB connection string to `DB_URL`.
5. Allow your IP address in MongoDB Atlas Network Access.

For Vercel deployment, MongoDB Atlas Network Access should allow:

```text
0.0.0.0/0
```

---

# 🎯 How to Use

### 👨‍🏫 Instructor

1. Open the application.
2. Register an account as an **Instructor**.
3. Log in.
4. Open **Create Course**.
5. Enter the course details.
6. Publish the course.
7. Manage your published courses.

### 👨‍🎓 Student

1. Register a new account as a **Student**.
2. Log in.
3. Browse the available courses.
4. Open a course.
5. Click **Enroll**.
6. Access your enrolled course from the student dashboard.

---

# ☁️ Deploying to Vercel

The project is configured to deploy the **React frontend and Express API together** on Vercel.

### Vercel Configuration

In your Vercel project settings:

* **Root Directory:** `./`
* **Framework Preset:** `Other`
* **Build Command:** Leave empty
* **Output Directory:** Leave empty

The repository's `vercel.json` handles the build configuration.

### Environment Variables

Add these variables in Vercel:

```text
DB_URL
JWT_SECRET
```

Or, if your project uses separate MongoDB variables:

```text
MONGO_USER
MONGO_PASSWORD
MONGO_HOST
MONGO_DB
JWT_SECRET
```

Add them for both **Production** and **Preview** environments.

After adding the variables, redeploy the project.

The deployed API can be tested using:

```text
https://your-project.vercel.app/api/health
```

A successful response should look like:

```json
{
  "status": "ok",
  "database": "connected"
}
```

---

# 🔐 Authentication

The platform uses **JWT-based authentication**.

* User passwords are securely hashed using **bcrypt**.
* JWT tokens are generated during login/registration.
* Tokens are stored on the frontend.
* Protected API routes require authentication.
* Role-based access controls instructor and student features.

---

# 📸 Main Modules

✅ Authentication & Registration

✅ Instructor Dashboard

✅ Student Dashboard

✅ Course Catalog

✅ Course Creation

✅ Course Management

✅ Course Enrollment

✅ Role-Based Access

✅ MongoDB Database

✅ REST API

✅ Responsive Frontend

---

# 🌟 Future Improvements

* 💳 Online Course Payments
* 🎥 Video Course Content
* ⭐ Course Ratings & Reviews
* 🔎 Advanced Course Search
* 🏷️ Course Categories
* 📜 Course Completion Certificates
* 📊 Instructor Analytics
* 💬 Student & Instructor Messaging
* ❤️ Wishlist Courses
* 🔔 Notifications
* 👤 Profile Management

---

# 🤝 Contributing

Contributions are welcome!

1. Fork this repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push your branch
6. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👩‍💻 Developer

**Dhriti Yadav**

🌐 Portfolio: https://dhriti09.netlify.app

🐙 GitHub: https://github.com/dhriti09
