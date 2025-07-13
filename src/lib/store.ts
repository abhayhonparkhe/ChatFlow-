import { create } from "zustand";
import { persist } from 'zustand/middleware';



export const useChatStore = create(
  persist(
    (set) => ({
      room: '',
      setRoom: (room: string) => set({ room }),
    }),
    {
      name: 'chat-storage', // LocalStorage key
    }
  )
);
