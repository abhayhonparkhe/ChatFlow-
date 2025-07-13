# ChatFlow - Real-time Chat Application

A beautiful, modern real-time chat application with macOS-inspired design built with Next.js, Firebase, and Socket.IO.

## Project Information

- **Project Title**: ChatFlow - Real-time Chat Application
- **Technologies**: Next.js, React, TypeScript, Firebase, Socket.IO, Tailwind CSS
- **Difficulty Level**: Hard
- **Repository**: https://github.com/abhayhonparkhe/ChatFlow-.git

## Project Description

This assignment implements a real-time chat application that creates a web-based chat platform where users can join chat rooms, exchange messages in real-time, and have a smooth and interactive chat experience.

## ✅ Project Requirements Implementation

### User Interface ✅
- **Intuitive and visually appealing UI**: macOS-style design with glass morphism effects
- **Chat room interface**: Room list sidebar, message display area, and input field
- **Responsive design**: Works perfectly on desktop, tablet, and mobile devices
- **Mobile hamburger menu**: Easy navigation on mobile devices

### Real-Time Communication ✅
- **WebSocket implementation**: Using Socket.IO for real-time messaging
- **Room joining**: Users can select and join chat rooms
- **Real-time messages**: Messages appear instantly without page refresh
- **Live updates**: All users see messages in real-time

### User Authentication ✅
- **Username selection**: Users must choose a username before joining rooms
- **Google Sign-In**: Secure authentication with Firebase Auth
- **Unique usernames**: Firebase handles username uniqueness
- **Session management**: Persistent user sessions

### Chat Features ✅
- **Text messaging**: Users can send text messages in chat rooms
- **Message attribution**: Shows who sent each message with user avatars
- **Timestamps**: Each message displays the time it was sent
- **Text formatting**: Markdown support for bold, italic, and links
- **XSS protection**: DOMPurify sanitizes all user input

### Room Management ✅
- **Create rooms**: Users can create new chat rooms
- **Join rooms**: Users can join existing rooms
- **Room list**: Displays all available chat rooms
- **Room search**: Search functionality to find specific rooms
- **Exit rooms**: Easy room exit functionality

### User Experience ✅
- **Smooth experience**: Loading states and smooth animations
- **Message scrolling**: Auto-scroll to latest messages
- **Notifications**: Visual feedback for new messages
- **Edge case handling**: Empty messages, room selection validation
- **Mobile optimization**: Touch-friendly interface

### Additional Considerations ✅
- **Security**: Firebase security rules and input validation
- **User disconnection**: Handles user join/leave scenarios
- **Error handling**: Comprehensive error states and validation
- **Performance**: Optimized for real-time communication

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom macOS-style design
- **Backend**: Next.js API Routes with Socket.IO
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Real-time**: Socket.IO
- **Markdown**: Marked.js with DOMPurify for security

## 🚀 How to Run the Application

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhayhonparkhe/ChatFlow-.git
   cd ChatFlow-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Google provider)
   - Enable Firestore Database
   - Download your service account key and save it as `src/lib/firebase-admin-key.json`

4. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use the Application

1. **Sign In**: Click "Continue with Google" to authenticate
2. **Set Username**: Choose a display name for the chat
3. **Join/Create Room**: Enter a room name to join or create a new one
4. **Start Chatting**: Send messages with markdown support (use **bold** or _italic_)
5. **Navigate**: Use the sidebar (desktop) or hamburger menu (mobile) to switch rooms
6. **Exit**: Click the exit button to leave a room

## 📱 Features Overview

- **Real-time messaging** with instant delivery
- **Room management** with search functionality
- **User authentication** with Google Sign-In
- **Mobile-responsive design** with hamburger menu
- **Message formatting** with Markdown support
- **Beautiful UI** with macOS-inspired design
- **Security features** with XSS protection

## 📄 License

This project is licensed under the MIT License.

---

**Project submitted for: Real-time Chat Application Assignment**
