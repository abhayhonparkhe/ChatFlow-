// lib/hooks/useAuthUser.ts (optional to extract this hook out)
import { useState, useEffect } from "react";
import { onAuthStateChanged,User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return user;
}
