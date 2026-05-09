"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  return (
    <div
      data-testid="notification"
      className={`mx-auto mt-4 max-w-6xl rounded-3xl px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 ${
        type === "success"
          ? "bg-emerald-500"
          : "bg-rose-500"
      }`}
      role="status"
    >
      {message}
    </div>
  )
}