import Link from "next/link"
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
    <div className="mx-auto max-w-2xl p-6">
      <form className="mb-6 flex gap-3">
        <input
          type="text"
          name="filter"
          placeholder="Filter by title..."
          defaultValue={filter}
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Apply
        </button>
      </form>

      <h2 className="mb-6 text-3xl font-bold text-blue-500">
        Blogs
      </h2>

      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="block"
            >
              <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                {blog.title}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                By {blog.author}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {blogs.length === 0 && (
        <p className="mt-6 text-center text-gray-500">
          No blogs found.
        </p>
      )}
    </div>
  )
}

export default Blogs