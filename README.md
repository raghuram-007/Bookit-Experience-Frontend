<<<<<<< HEAD
=======
#if you want an installation step and setup detail you can check in readme (1) 
# React + TypeScript + Vite
>>>>>>> fd4cd86622a404495b339662e57afa01c7c16756

# 🌟 BookIt - Experience Booking Platform

BookIt is a full-stack web application where users can explore unique experiences, view available slots, and make bookings with promo codes and instant confirmation.  

Built as part of a full-stack assignment using **React**, **Node.js**, and **MongoDB**.

## 🚀 Features

- 🏞️ Browse curated experiences with images and prices  
- 🕒 View available slots and book in real time  
- 🎟️ Apply promo codes for discounts (SAVE10 / FLAT100)  
- 📅 Prevent double booking with slot capacity tracking  
- 💌 Get instant booking confirmation  
- 💻 Built with React + Tailwind + Express + MongoDB  

---
## Author

👤 **Author:** Raghu Ram  
🌐 **GitHub:** [raghuram-007](https://github.com/raghuram-007)  



![Author](https://img.shields.io/badge/Author-Raghu%20Ram-blue?style=for-the-badge)
![GitHub](https://img.shields.io/badge/GitHub-raghuram--007-black?style=for-the-badge&logo=github&logoColor=white)


### 🏷️ Tech Badges

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + TypeScript + Vite + TailwindCSS |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| API Testing | Fetch (browser-based) |
| Deployment | Render (Backend) + Vercel (Frontend) |


# Install dependencies

## For backend:

cd backend
npm install


## For frontend:

cd frontend
npm install

# Setup environment variables

Create a .env file inside the backend folder:

MONGO_URI=mongodb://localhost:27017/bookit
PORT=5000

## Run the backend
npm run dev


You should see:

✅ MongoDB connected
🚀 Server running on port 5000


## Run the frontend

In another terminal:

npm run dev


Open the app at http://localhost:5173
# Seeding Database

To insert sample experiences:

cd backend
npm run seed


You’ll see messages like:

✅ Connected to MongoDB
🧹 Cleared old experience data
🌱 Seed data inserted successfully
🔌 Disconnected from MongoDB
## API Endpoints Summary


| **Method** | **Endpoint**           | **Description**                        |
| ---------- | ---------------------- | -------------------------------------- |
| **GET**    | `/api/experiences`     | Fetch all experiences                  |
| **GET**    | `/api/experiences/:id` | Fetch a single experience by ID        |
| **POST**   | `/api/bookings`        | Create a new booking                   |
| **GET**    | `/api/bookings/:id`    | Fetch booking details by ID            |
| **POST**   | `/api/promo/validate`  | Validate promo code (SAVE10 / FLAT100) |

# Promo Code

| Code      | Type    | Value    |
| --------- | ------- | -------- |
| `SAVE10`  | Percent | 10% off  |
| `FLAT100` | Flat    | ₹100 off |
