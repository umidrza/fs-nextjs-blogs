import Link from "next/link"
import { Suspense } from "react"
import blogService from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const allBlogs = await blogService.getBlogs()
  const { filter } = await searchParams

  const blogs = filter
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : allBlogs

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Blogs
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Browse all published posts and filter by title.
          </p>
        </div>

        <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            data-testid="filter-input"
            type="text"
            name="filter"
            placeholder="Filter by title..."
            defaultValue={filter}
            className="min-w-0 flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            data-testid="search-button"
            type="submit"
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Apply
          </button>
        </form>
      </div>

      <Suspense fallback={<p className="text-slate-600">Loading blogs...</p>}>

      <ul className="space-y-4" data-testid="blogs-list">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="block"
            >
              <h3 className="text-xl font-semibold text-slate-950 hover:text-blue-600 hover:underline">
                {blog.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                By {blog.author}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {blog.likes} likes
              </p>
            </Link>
          </li>
        ))}
      </ul>

      </Suspense>

      {blogs.length === 0 && (
        <p className="mt-6 text-center text-slate-500">
          No blogs found.
        </p>
      )}
    </div>
  )
}

export default Blogs