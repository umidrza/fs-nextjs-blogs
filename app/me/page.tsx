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
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/50">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            My profile
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Personal dashboard for your reading list and API token.
          </p>
        </div>

        <div className="grid gap-8 rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="space-y-2 text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Name:</span>{" "}
              {user.name}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Username:</span>{" "}
              {user.username}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Reading list
              </h2>
              {readingList.length === 0 ? (
                <p className="mt-3 rounded-3xl border border-dashed border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
                  Your reading list is empty.
                </p>
              ) : (
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Unread
                    </h3>
                    {unread.length === 0 ? (
                      <p className="mt-3 text-sm text-slate-500">
                        No unread blogs yet.
                      </p>
                    ) : (
                      <div className="mt-4 space-y-4">
                        {unread.map((item) => (
                          <div
                            key={item.reading_list.id}
                            className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div>
                              <h4 className="text-lg font-semibold text-slate-900">
                                {item.blogs.title}
                              </h4>
                              <p className="text-sm text-slate-500">
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
                                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                              >
                                Mark as read
                              </button>
                            </form>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Read
                    </h3>
                    {read.length === 0 ? (
                      <p className="mt-3 text-sm text-slate-500">
                        No read blogs yet.
                      </p>
                    ) : (
                      <div className="mt-4 space-y-4">
                        {read.map((item) => (
                          <div
                            key={item.reading_list.id}
                            className="rounded-[1.5rem] border border-slate-200 bg-slate-100 p-5"
                          >
                            <h4 className="text-lg font-semibold text-slate-900">
                              {item.blogs.title}
                            </h4>
                            <p className="text-sm text-slate-500">
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

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                API token
              </h2>
              {user.token ? (
                <p className="mt-3 break-all rounded-3xl bg-slate-950/5 px-5 py-4 text-sm text-blue-700">
                  {user.token}
                </p>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  No token generated yet.
                </p>
              )}
              <div className="mt-4">
                <TokenButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MePage