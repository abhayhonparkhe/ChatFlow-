"use client";

import { useAuthUser } from "@/lib/hooks/useAuthUser";
import RoomJoinForm from "@/components/RoomJoinForm";
import RoomListSidebar from "@/components/RoomListSidebar";
import LoginButton from "@/components/LoginButton";

export default function HomePage() {
  const user = useAuthUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="glass rounded-2xl p-8 shadow-lg max-w-md w-full animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome to ChatFlow
            </h1>
            <p className="text-gray-600 text-lg">
              Connect, chat, and collaborate in real-time
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-500 mb-4">
                Sign in to start your conversation journey
              </p>
              <LoginButton />
            </div>
            
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Secure • Fast • Beautiful
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <RoomListSidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="glass rounded-2xl p-6 lg:p-8 shadow-lg max-w-lg w-full animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Ready to Chat?
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              Join an existing room or create a new one to start chatting
            </p>
          </div>
          
          <RoomJoinForm />
          
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Welcome back, <span className="font-semibold text-gray-700">{user.displayName}</span>! 👋
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
