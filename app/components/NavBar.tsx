"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="flex items-center gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blogs">Blogs</NavLink>
          <NavLink href="/users">Users</NavLink>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {session ? (
            <>
              <NavLink href="/blogs/new">Create Blog</NavLink>
              <NavLink href="/me">Me</NavLink>

              <button
                onClick={() => signOut()}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
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