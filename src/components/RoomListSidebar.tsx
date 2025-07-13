"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useChatStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/lib/hooks/useAuthUser";

export default function RoomSidebar() {
  const [rooms, setRooms] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { room, setRoom } = useChatStore();
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (!user) return;

    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const snapshot = await getDocs(query(collection(db, "rooms")));
        const roomNames = snapshot.docs.map((doc) => doc.id);
        setRooms(roomNames);
      } catch (err) {
        console.error("❌ Error fetching rooms:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [user]);

  const filteredRooms = rooms.filter((r) =>
    r.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoinRoom = (roomName: string) => {
    setRoom(roomName);
    router.push("/chat");
    setIsOpen(false); // Close sidebar on mobile after selecting room
  };

  const handleExitRoom = () => {
    setRoom("");
    router.push("/");
    setIsOpen(false); // Close sidebar on mobile
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-sm border-r border-gray-200 flex flex-col h-screen transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Chat Rooms</h2>
            <div className="flex items-center space-x-2">
              {room && (
                <button
                  onClick={handleExitRoom}
                  className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="hidden sm:inline">Exit Room</span>
                </button>
              )}
              {/* Close button for mobile */}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              placeholder="Search rooms..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">
                {search ? "No rooms found" : "No rooms available"}
              </p>
              {!search && (
                <p className="text-gray-400 text-xs mt-1">
                  Create a room to get started
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredRooms.map((r) => (
                <div
                  key={r}
                  className={`cursor-pointer px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center space-x-3 ${
                    r === room
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => handleJoinRoom(r)}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    r === room ? "bg-white" : "bg-gray-300"
                  }`}></div>
                  <span className="font-medium">#{r}</span>
                  {r === room && (
                    <span className="ml-auto text-xs opacity-75">Active</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
