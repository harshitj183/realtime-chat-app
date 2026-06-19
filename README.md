
# Real-Time Chat Application

A premium full-stack real-time chat application built using React, Express, MongoDB, and Socket.io.

---

## 📸 Screenshots

### 1. Login Page
![Login Page](attachments/screenshots/screenshot_login.png)

### 2. Signup Page
![Signup Page](attachments/screenshots/screenshot_signup.png)

### 3. Main Chat Interface
![Main Chat Screen](attachments/screenshots/realtime_chat_screenshot.png)

### 4. Edit Profile Settings Modal
![Edit Profile Settings Modal](attachments/screenshots/screenshot_profile_modal.png)

---

## Features

- **Real-Time Messaging**: Instant delivery of messages using Socket.io WebSockets.
- **Dynamic Online Status**: Green indicator dots showing which users are currently online.
- **Customizable User Profile**: Update full name, gender, and customize DiceBear avatar styles in real-time.
- **Clean Responsive UI**: Designed with TailwindCSS and DaisyUI dark theme presets.
- **Enter-to-Submit**: Smooth UX for swift forms submit and chat send.
- **Sound Notifications**: Subtle wave chime alerts on receiving new messages.

---

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, React Router DOM, TailwindCSS, DaisyUI, Socket.io-client.
- **Backend**: Node.js, Express, Socket.io, Mongoose.
- **Database**: MongoDB.

---

## Installation & Setup

### Prerequisites
- Node.js installed.
- MongoDB database URI connection string.

### 1. Server Configuration
Go to `server` folder:
```bash
cd server
npm install
```
Configure a `.env` file inside `server/` folder:
```env
MONGO_DB=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=2d
PORT=5000
```
Run development server:
```bash
npm run dev
```

### 2. Client Configuration
Go to `client` folder:
```bash
cd client
npm install
```
Run development client:
```bash
npm run dev
```
Open [http://localhost:5175](http://localhost:5175) to view and test the application!



