# Real-Time Chat Application

A full-stack real-time chat application built with React, Express, MongoDB, and Socket.io.

**Live Demo:** [https://client-eta-vert.vercel.app](https://client-eta-vert.vercel.app)  
**Backend API:** [https://server-three-tau-86.vercel.app](https://server-three-tau-86.vercel.app)  
**GitHub:** [https://github.com/harshitj183/realtime-chat-app](https://github.com/harshitj183/realtime-chat-app)

---

## Screenshots

<table>
  <tr>
    <td><img src="attachments/screenshots/screenshot_login.png" alt="Login" width="100%"/></td>
    <td><img src="attachments/screenshots/screenshot_signup.png" alt="Signup" width="100%"/></td>
  </tr>
  <tr>
    <td><img src="attachments/screenshots/realtime_chat_screenshot.png" alt="Chat" width="100%"/></td>
    <td><img src="attachments/screenshots/screenshot_profile_modal.png" alt="Profile" width="100%"/></td>
  </tr>
</table>

---

## Features

- Real-time messaging with Socket.io WebSockets
- Online/offline user status indicators
- Customizable DiceBear avatars
- JWT-based authentication
- Responsive dark theme UI with TailwindCSS and DaisyUI

---

## Tech Stack

- **Frontend** — React, Redux Toolkit, React Router, TailwindCSS, DaisyUI
- **Backend** — Node.js, Express, Socket.io
- **Database** — MongoDB Atlas, Mongoose
- **Auth** — JWT, bcryptjs

---

## Local Setup

### 1. Clone

```bash
git clone https://github.com/harshitj183/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGO_DB=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRE=2d
PORT=5000
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Client

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)
