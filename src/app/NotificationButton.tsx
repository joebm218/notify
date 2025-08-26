
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
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification(message || "Hi there!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(message || "Hi there!");
        }
      });
    }
  }, [trigger, message]);

  return null;
}
