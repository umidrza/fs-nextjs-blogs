import { redirect } from "next/navigation"
import TokenButton from "./TokenButton"
import { getCurrentUser } from "../services/session"

const MePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-500">My Profile</h1>

        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {user.name}
          </p>

          <p>
            <span className="font-semibold">Username:</span>{" "}
            {user.username}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue-500">
            API Token
          </h2>

          {user.token ? (
            <p className="mt-2 break-all rounded-md bg-gray-100 p-3 text-sm text-blue-500">
              {user.token}
            </p>
          ) : (
            <p className="mt-2 text-sm text-blue-400">
              No token generated yet.
            </p>
          )}

          <div className="mt-4">
            <TokenButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MePage