// src/components/ChatMessage.tsx
'use client';

import DOMPurify from 'dompurify';
import { marked } from 'marked';
import type { Timestamp } from "firebase/firestore";
import { useMemo } from 'react';
import { useAuthUser } from '@/lib/hooks/useAuthUser';

interface Props {
  user: string;
  message: string;
  timestamp: Timestamp;
}

export default function ChatMessage({ user, message, timestamp }: Props) {
  const currentUser = useAuthUser();
  const isOwnMessage = currentUser?.displayName === user;
  
  // Ensure marked.parse returns a string (synchronously)
  const html = useMemo(() => marked.parse(message) as string, [message]);
  const cleanHTML = useMemo(() => DOMPurify.sanitize(html), [html]);
  
  let readableTime = "";
  if (timestamp && typeof timestamp.toDate === "function") {
    readableTime = timestamp.toDate().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (typeof timestamp === "string") {
    readableTime = timestamp;
  }

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-3 lg:mb-4 animate-fade-in`}>
      <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        {!isOwnMessage && (
          <div className="text-xs lg:text-sm font-medium text-gray-700 mb-1 flex items-center space-x-2">
            <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user.charAt(0).toUpperCase()}
            </div>
            <span className="truncate">{user}</span>
          </div>
        )}
        
        <div className={`rounded-2xl px-3 lg:px-4 py-2 lg:py-3 shadow-sm ${
          isOwnMessage 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'bg-white border border-gray-200 text-gray-800'
        }`}>
          <div
            className={`text-sm lg:text-base leading-relaxed [&_a]:underline [&_strong]:font-semibold break-words ${
              isOwnMessage 
                ? '[&_a]:text-blue-100 [&_a:hover]:text-white' 
                : '[&_a]:text-blue-600 [&_a:hover]:text-blue-700'
            }`}
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {readableTime}
        </div>
      </div>
    </div>
  );
}
