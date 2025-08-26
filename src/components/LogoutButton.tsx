"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useChatStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { clearStore } = useChatStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearStore(); // Clear all store data
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
      Logout
    </button>
  );
}