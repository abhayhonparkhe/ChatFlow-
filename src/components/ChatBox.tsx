"use client";

import { useEffect, useState, useRef } from 'react';
import ChatMessage from '@/components/ChatMessage';
import { useChatStore } from '@/lib/store';
import { getSocket } from '@/lib/socket';
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import LoginButton from '@/components/LoginButton';
import { useAuthUser } from '@/lib/hooks/useAuthUser';
import { useRouter } from 'next/navigation';

const socket = getSocket();

function useIsHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export default function ChatBox() {
  const hydrated = useIsHydrated();
  const { room, setRoom } = useChatStore();
  const user = useAuthUser();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const username = user?.displayName ?? "Anonymous";

  useEffect(() => {
    fetch('/api/socket');
  }, []);

  useEffect(() => {
    if (!room) return;

    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const messagesQuery = query(
          collection(db, "rooms", room, "messages"),
          orderBy("timestamp")
        );
        const snapshot = await getDocs(messagesQuery);
        const msgs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            timestamp: data.timestamp instanceof Timestamp
              ? data.timestamp
              : Timestamp.fromMillis(data.timestamp?.seconds * 1000 || Date.now()),
          };
        });
        setMessages(msgs);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    socket.emit("joinRoom", room);
    loadMessages();

    socket.on("chatMessage", (msg) => {
      const fixedMsg = {
        ...msg,
        timestamp: Timestamp.fromMillis(msg.timestamp?.seconds * 1000 || Date.now()),
      };
      setMessages((prev) => [...prev, fixedMsg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [room]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (user && !user.displayName) {
      setShowNamePrompt(true);
    }
  }, [user]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit('chatMessage', {
      message: input,
      username,
      room,
    });

    setInput('');
  };

  const handleSetUsername = async () => {
    if (!tempName.trim()) return;

    try {
      await updateProfile(user!, {
        displayName: tempName.trim(),
      });
      setShowNamePrompt(false);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleExitRoom = () => {
    setRoom("");
    router.push("/");
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="glass rounded-2xl p-6 shadow-lg max-w-md w-full animate-fade-in">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access the chat</p>
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="glass rounded-2xl p-6 shadow-lg max-w-md w-full animate-fade-in text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Room Selected</h2>
          <p className="text-gray-600 mb-6">Please join or create a room to start chatting</p>
          <button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Choose a Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="glass border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="text-center">
              <h1 className="text-base lg:text-lg font-semibold text-gray-800">#{room}</h1>
              <p className="text-xs text-gray-500">{messages.length} messages</p>
            </div>
          </div>
          
          <button
            onClick={handleExitRoom}
            className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
            title="Exit Room"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 lg:py-12">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-base lg:text-lg font-medium text-gray-800 mb-2">No messages yet</h3>
            <p className="text-gray-500 text-sm lg:text-base">Be the first to start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-3 lg:space-y-4">
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                user={msg.user}
                message={msg.message}
                timestamp={msg.timestamp}
              />
            ))}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="glass border-t border-gray-200 p-4 lg:p-6">
        <div className="flex gap-2 lg:gap-3">
          <input
            className="flex-1 border border-gray-200 rounded-xl px-3 lg:px-4 py-2 lg:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-sm lg:text-base"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 lg:space-x-2"
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>

      {/* Username Prompt Modal */}
      {showNamePrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="glass rounded-2xl p-6 lg:p-8 shadow-2xl max-w-md w-full animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Choose Your Username</h2>
              <p className="text-gray-600 text-sm lg:text-base">This will be displayed to other users in the chat</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                placeholder="Enter your username..."
                onKeyDown={(e) => e.key === 'Enter' && handleSetUsername()}
                autoFocus
              />
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSetUsername}
                disabled={!tempName.trim()}
              >
                Save Username
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
