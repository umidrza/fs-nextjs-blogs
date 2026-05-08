"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-slate-950/95 px-6 py-4 backdrop-blur-xl shadow-sm shadow-slate-900/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blogs">Blogs</NavLink>
          <NavLink href="/users">Users</NavLink>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-3">
          {session ? (
            <>
              <NavLink href="/blogs/new">Create Blog</NavLink>
              <NavLink href="/me">Me</NavLink>

              <button
                onClick={() => signOut()}
                className="rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}