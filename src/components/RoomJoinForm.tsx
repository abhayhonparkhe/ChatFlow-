"use client";

import { useState } from "react";
import { useChatStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthUser } from "@/lib/hooks/useAuthUser";

export default function RoomJoinForm() {
  const [roomInput, setRoomInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setRoom } = useChatStore();
  const router = useRouter();
  const user = useAuthUser();

  const handleJoin = async () => {
    if (!user?.displayName) {
      alert("You must set a username before joining a room.");
      return;
    }

    const trimmed = roomInput.trim().toLowerCase();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      const roomRef = doc(db, "rooms", trimmed);
      const roomSnap = await getDoc(roomRef);

      // Only create if it doesn't exist
      if (!roomSnap.exists()) {
        await setDoc(roomRef, {
          createdAt: serverTimestamp(),
        });
      }

      setRoom(trimmed);
      setRoomInput("");
      router.push("/chat");
    } catch (error) {
      console.error("Error joining room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="text-center">
        <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
          Enter Room Name
        </h3>
        <p className="text-gray-600 text-xs lg:text-sm">
          Create a new room or join an existing one
        </p>
      </div>
      
      <div className="space-y-3 lg:space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="e.g., general, gaming, work"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            className="w-full pl-10 lg:pl-10 pr-4 py-3 lg:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-sm lg:text-base"
          />
        </div>
        
        <button
          onClick={handleJoin}
          disabled={isLoading || !roomInput.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Joining...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>Join Room</span>
            </>
          )}
        </button>
      </div>
      
      <div className="text-center">
        <p className="text-xs text-gray-500">
          💡 Tip: Room names are case-insensitive and will be converted to lowercase
        </p>
      </div>
    </div>
  );
}
