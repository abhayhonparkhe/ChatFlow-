# ChatFlow - Real-time Chat Application

A beautiful, modern real-time chat application with macOS-inspired design built with Next.js, Firebase, and Socket.IO.

![ChatFlow](https://img.shields.io/badge/ChatFlow-Real--time%20Chat-blue?style=for-the-badge&logo=chat)

## ✨ Features

### 🎨 **Beautiful macOS-Style Design**
- Glass morphism effects with backdrop blur
- Smooth animations and transitions
- Gradient backgrounds and modern UI elements
- Responsive design that works on all devices

### 💬 **Real-Time Chat**
- Instant message delivery using WebSocket technology
- Message bubbles with different styles for own/other messages
- Markdown support for text formatting (bold, italic, links)
- Message timestamps and user attribution

### 🔐 **User Authentication**
- Google Sign-In integration
- Username customization
- Secure user sessions

### 🏠 **Room Management**
- Create new chat rooms
- Join existing rooms
- Room search functionality
- Easy room navigation with sidebar
- Exit room functionality

### 🚀 **User Experience**
- Loading states and smooth transitions
- Auto-scroll to latest messages
- Empty state handling
- Error handling and validation
- Keyboard shortcuts (Enter to send)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom macOS-style design
- **Backend**: Next.js API Routes with Socket.IO
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Real-time**: Socket.IO
- **Markdown**: Marked.js with DOMPurify for security

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhayhonparkhe/ChatFlow-.git
   cd my-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project
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

## 🎯 How to Use

1. **Sign In**: Click "Continue with Google" to authenticate
2. **Set Username**: Choose a display name for the chat
3. **Join/Create Room**: Enter a room name to join or create a new one
4. **Start Chatting**: Send messages with markdown support
5. **Navigate**: Use the sidebar to switch between rooms
6. **Exit**: Click the exit button to leave a room

## 🎨 Design Features

- **Glass Morphism**: Translucent backgrounds with blur effects
- **Gradient Accents**: Beautiful color gradients throughout the UI
- **Smooth Animations**: Fade-in effects and smooth transitions
- **macOS Elements**: Traffic light buttons and native-like styling
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile

## 🔧 Customization

The app uses CSS custom properties for easy theming. You can modify the colors in `src/app/globals.css`:

```css
:root {
  --macos-bg: #f5f5f7;
  --macos-accent: #007aff;
  --macos-success: #34c759;
  --macos-danger: #ff3b30;
  /* ... more variables */
}
```

## 📱 Responsive Design

- **Desktop**: Full sidebar with room list
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Responsive design with touch-friendly elements

## 🔒 Security Features

- XSS protection with DOMPurify
- Firebase security rules
- Input validation and sanitization
- Secure authentication flow

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Firebase for backend services
- Socket.IO for real-time communication
- Tailwind CSS for styling utilities

---

**Made with ❤️ for real-time communication**
