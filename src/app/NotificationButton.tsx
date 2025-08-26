
"use client";

import { useEffect } from "react";

interface NotificationButtonProps {
  message: string;
  trigger: number; // 🔹 number instead of boolean
}

export default function NotificationButton({ message, trigger }: NotificationButtonProps) {
  useEffect(() => {
    if (!trigger) return;

    if (typeof window === "undefined") return;

    if (!("Notification" in window)) {
        console.log(`This browser does not support desktop notification`)
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    
    const notification = new Notification(message);

    // Auto close after 3 seconds
    setTimeout(() => {
      notification.close();
    }, 3000);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
       
         const notification = new Notification(message);
        setTimeout(() => notification.close(), 3000);
        }
      });
    }
  }, [trigger, message]);

  return null;
}
