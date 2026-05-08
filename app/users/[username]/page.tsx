import Link from "next/link"
import { notFound } from "next/navigation"
import userService from "../../services/users"

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await userService.getUserByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/40">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            {user.name}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            @{user.username}
          </p>
        </div>

        <div>
<div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-slate-900">
              Blogs
            </h3>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {user.blogs.length}
            </span>
          </div>

          {user.blogs.length > 0 ? (
            <ul className="space-y-4">
              {user.blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-slate-50"
                >
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-slate-950 hover:text-blue-600 hover:underline">
                        {blog.title}
                      </h4>

                      <span className="text-sm text-slate-400">
                        View →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
              This user has not created any blogs yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPage