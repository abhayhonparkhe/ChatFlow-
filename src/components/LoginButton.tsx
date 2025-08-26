"use client";

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signInAnonymously, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginButton() {
  const [dummyName, setDummyName] = useState("");
  const [showDummyLogin, setShowDummyLogin] = useState(false);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signInAsDummy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dummyName.trim()) return;

    try {
      // Sign in anonymously with Firebase
      const result = await signInAnonymously(auth);
      // Update the profile with the dummy name using the correct updateProfile function
      if (result.user) {
        await updateProfile(result.user, {
          displayName: dummyName,
          photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            dummyName
          )}&background=random`,
        });
      }
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Welcome to ChatFlow
        </h1>

        {!showDummyLogin ? (
          <div className="space-y-4">
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <img src="/google.svg" alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  or
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowDummyLogin(true)}
              className="w-full bg-blue-500 text-white rounded-lg px-6 py-2 text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue as Guest
            </button>
          </div>
        ) : (
          <form onSubmit={signInAsDummy} className="space-y-4">
            <div>
              <label
                htmlFor="dummyName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Display Name
              </label>
              <input
                type="text"
                id="dummyName"
                value={dummyName}
                onChange={(e) => setDummyName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your display name"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowDummyLogin(false)}
                className="flex-1 bg-gray-200 text-gray-800 rounded-lg px-6 py-2 text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white rounded-lg px-6 py-2 text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Join Chat
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
