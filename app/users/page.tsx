import Link from "next/link"
import userService from "../services/users"

const Users = async () => {
  const users = await userService.getUsers()

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Users
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Browse all registered users.
          </p>
        </div>

        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="rounded-xl border border-gray-200 p-4 transition hover:border-blue-300 hover:bg-gray-50"
            >
              <Link
                href={`/users/${user.username}`}
                className="block"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                      {user.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      @{user.username}
                    </p>
                  </div>

                  <span className="text-sm font-medium text-gray-400">
                    View →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {users.length === 0 && (
          <p className="mt-6 text-center text-gray-500">
            No users found.
          </p>
        )}
      </div>
    </div>
  )
}

export default Users