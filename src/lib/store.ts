import { create } from "zustand";
import { persist } from 'zustand/middleware';



type ChatStore = {
  room: string;
  setRoom: (room: string) => void;
};
export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      room: '',
      setRoom: (room: string) => set({ room }),
    }),
    {
      name: 'chat-storage',
    }
  )
);
