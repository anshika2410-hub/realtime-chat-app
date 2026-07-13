# 💬 Real-Time Chat Application

A full-stack Real-Time Chat Application built using **React.js**, **Node.js**, **Express.js**, **MongoDB Atlas**, and **Socket.io**. The application enables users to exchange messages instantly with persistent chat history and a clean, responsive interface.

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)

![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)

![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-010101?logo=socketdotio&logoColor=white)

![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)

![Mongoose](https://img.shields.io/badge/ODM-Mongoose-880000?logo=mongoose&logoColor=white)

![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)

![Render](https://img.shields.io/badge/Deployment-Render-46E3B7?logo=render&logoColor=white)

---

## 🚀 Features

- 🔐 Username-based Login
- 💬 Real-Time Messaging using Socket.io
- 📜 Persistent Chat History (MongoDB)
- ⏰ Message Timestamps
- 👤 Online Users List
- ⌨️ Typing Indicator
- 🔄 Auto Scroll to Latest Message
- 🚪 Logout Functionality
- 📱 Responsive UI
- 🌐 Backend Deployed on Render

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Axios
- Socket.io Client
- CSS3

### Backend
- Node.js
- Express.js
- Socket.io
- MongoDB Atlas
- Mongoose

### Deployment
- Render (Backend)
- GitHub

---

## 📂 Project Structure

```
realtime-chat-app
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/anshika2410-hub/realtime-chat-app.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 📡 API Endpoints

### Get Messages

```
GET /api/messages
```

### Send Message

```
POST /api/messages
```

Request Body

```json
{
  "username": "Anshika",
  "text": "Hello World"
}
```

---

## 🌐 Live Backend

https://realtime-chat-app-bwk8.onrender.com/

### API

https://realtime-chat-app-bwk8.onrender.com/api/messages

---

## 📸 Screenshots

## Login Screen

![Login Screen](./screenshots/login_dashboard.png)

---

## Chat Interface

![Chat Interface](./screenshots/chat_interface.png)

---


## Typing Indicator

![Typing Indicator](./screenshots/Typing_indicator.png)

---

## Online Users

![Online Users](./screenshots/online_users.png)

---

## MongoDB Atlas Database

![MongoDB](./screenshots/Database.png)

---


## 🎯 Future Improvements

- Message Delivered & Seen Status
- Private One-to-One Chat
- File & Image Sharing
- Emoji Support
- User Authentication
- Dark Mode
- Notifications

---

## 👩‍💻 Contact

**Anshika Agrawal**

* GitHub: https://github.com/anshika2410-hub
* LinkedIn: https://www.linkedin.com/in/contact-anshikaagrawal/
* Email: anshikaagrawal2410@gmail.com

---
## 🤝 Contributing

Contributions, suggestions, and feedback are welcome. Feel free to fork the repository, create a new branch, and submit a pull request.

## 📜 License

This project is available for educational and personal use.

---

⭐ If you found this project helpful, consider giving it a star on GitHub.
