"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

const inputStyles =
  "rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

export default function LoginPage() {
  const router = useRouter()
  const { showNotification } = useNotification()

  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
      showNotification(`Welcome ${formData.get("username")}`, "success")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/60">
        <h2 className="mb-6 text-3xl font-bold text-slate-950">
          Login
        </h2>

        {error && (
          <p className="mb-4 rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
            data-testid="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              name="username"
              required
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              required
              className={inputStyles}
            />
          </div>

          <button
            type="submit"
            data-testid="login-button"
            className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}