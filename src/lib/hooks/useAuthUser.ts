// lib/hooks/useAuthUser.ts (optional to extract this hook out)
import { useState, useEffect } from "react";
import { User, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Ensure user has a display name, even for anonymous users
        if (!user.displayName && user.isAnonymous) {
          try {
            await updateProfile(user, {
              displayName: `Guest_${Math.random().toString(36).substr(2, 6)}`,
              photoURL: `https://ui-avatars.com/api/?name=Guest&background=random`,
            });
          } catch (error) {
            console.error("Error updating profile:", error);
          }
        }
      }
      setUser(user);
    });
  }, []);

  return user;
}
