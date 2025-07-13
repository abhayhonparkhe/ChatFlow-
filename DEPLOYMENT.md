# 🚀 Deployment Guide - ChatFlow

This guide will help you deploy your ChatFlow application to make it live and accessible to users.

## 📋 Pre-Deployment Checklist

### ✅ Required Setup
- [ ] Firebase project configured
- [ ] Environment variables ready
- [ ] All code committed to GitHub
- [ ] Firebase service account key downloaded

## 🎯 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Perfect for Next.js applications
- Free tier available
- Automatic deployments from GitHub
- Built-in environment variable management
- Excellent performance

#### Step-by-Step Vercel Deployment:

1. **Prepare Your Code**
   ```bash
   # Commit all changes
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your repository: `abhayhonparkhe/ChatFlow-`
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at: `https://your-project.vercel.app`

### Option 2: Netlify

1. **Create netlify.toml**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Add environment variables
   - Deploy

### Option 3: Railway

1. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Add environment variables
   - Deploy

## 🔧 Environment Variables Setup

### Firebase Configuration
You need these variables from your Firebase project:

1. **Get Firebase Config**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Go to Project Settings → General
   - Scroll down to "Your apps"
   - Copy the config object

2. **Required Variables**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

## 🔒 Security Setup

### Firebase Security Rules
Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId} {
      allow read, write: if request.auth != null;
      
      match /messages/{messageId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

### Authentication Setup
1. Enable Google Sign-In in Firebase Console
2. Add your domain to authorized domains
3. Configure OAuth consent screen

## 🌐 Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Vercel dashboard → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for propagation (up to 48 hours)

## 📊 Monitoring & Analytics

### Vercel Analytics
- Enable Vercel Analytics in dashboard
- Monitor performance and errors
- Track user behavior

### Firebase Analytics
- Enable Google Analytics in Firebase
- Track user engagement
- Monitor app performance

## 🔄 Continuous Deployment

### Automatic Deployments
- Every push to `main` branch triggers deployment
- Preview deployments for pull requests
- Automatic rollback on errors

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check environment variables
   - Verify Firebase configuration
   - Check for TypeScript errors

2. **Socket.IO Issues**
   - Ensure WebSocket support on hosting platform
   - Check CORS settings
   - Verify API routes

3. **Authentication Problems**
   - Check Firebase Auth configuration
   - Verify authorized domains
   - Check OAuth consent screen

### Debug Commands
```bash
# Test build locally
npm run build

# Test production server
npm run start

# Check environment variables
echo $NEXT_PUBLIC_FIREBASE_API_KEY
```

## 📱 Post-Deployment

### Testing Checklist
- [ ] User registration works
- [ ] Room creation/joining works
- [ ] Real-time messaging works
- [ ] Mobile responsiveness
- [ ] Authentication flow
- [ ] Error handling

### Performance Optimization
- Enable Vercel Edge Functions
- Optimize images
- Enable caching
- Monitor Core Web Vitals

## 🎉 Success!

Your ChatFlow application is now live and accessible to users worldwide!

**Live URL**: `https://your-project.vercel.app`

---

**Need Help?** Check the troubleshooting section or create an issue in the GitHub repository. 