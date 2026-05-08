import { redirect } from "next/navigation"
import TokenButton from "./TokenButton"
import { getCurrentUser } from "../services/session"
import { getReadingListByUserId } from "../services/users"
import { markReadingListAsRead } from "../actions/readingList"

const MePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingListByUserId(user.id)

  const unread = readingList.filter(
    (item) => !item.reading_list.read
  )

  const read = readingList.filter(
    (item) => item.reading_list.read
  )

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-500">
          My Profile
        </h1>

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

        {/* Reading List */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-blue-500">
            My Reading List
          </h2>

          {readingList.length === 0 ? (
            <p className="mt-2 text-sm text-gray-500">
              Your reading list is empty.
            </p>
          ) : (
            <div className="mt-6 space-y-8">

              {/* UNREAD */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Unread
                </h3>

                {unread.length === 0 ? (
                  <p className="mt-2 text-sm text-gray-500">
                    No unread blogs 🎉
                  </p>
                ) : (
                  <div className="mt-3 space-y-3">
                    {unread.map((item) => (
                      <div
                        key={item.reading_list.id}
                        className="flex items-start justify-between rounded-md border p-4"
                      >
                        <div>
                          <h4 className="text-md font-semibold text-gray-800">
                            {item.blogs.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.blogs.author}
                          </p>
                        </div>

                        <form action={markReadingListAsRead}>
                          <input
                            type="hidden"
                            name="id"
                            value={item.reading_list.id}
                          />
                          <button
                            type="submit"
                            className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                          >
                            Mark as read
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* READ */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Read
                </h3>

                {read.length === 0 ? (
                  <p className="mt-2 text-sm text-gray-500">
                    No read blogs yet.
                  </p>
                ) : (
                  <div className="mt-3 space-y-3">
                    {read.map((item) => (
                      <div
                        key={item.reading_list.id}
                        className="rounded-md border bg-gray-50 p-4"
                      >
                        <h4 className="text-md font-semibold text-gray-800">
                          {item.blogs.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.blogs.author}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Token */}
        <div className="mt-10">
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