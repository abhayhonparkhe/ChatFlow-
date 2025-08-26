import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface ChatStore {
  username: string;
  room: string;
  setUsername: (username: string) => void;
  setRoom: (room: string) => void;
  clearStore: () => void; // Add this
}

export const useChatStore = create(
  persist<ChatStore>(
    (set) => ({
      username: '',
      room: '',
      setUsername: (username: string) => set({ username }),
      setRoom: (room: string) => set({ room }),
      clearStore: () => set({ username: '', room: '' }), // Add this
    }),
    {
      name: 'chat-storage',
    }
  )
);
