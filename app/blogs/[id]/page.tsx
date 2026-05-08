import { notFound } from "next/navigation"
import blogService from "../../services/blogs"
import { deleteBlog, likeBlog } from "../../actions/blogs"
import { addToReadingList } from "../../actions/readingList"

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blog = await blogService.getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl px-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {blog.title}
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            By{" "}
            <span className="font-medium text-gray-800">
              {blog.author}
            </span>
          </p>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <span className="font-semibold text-gray-900">
              URL:
            </span>{" "}
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-blue-600 hover:underline"
            >
              {blog.url}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              Likes:
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
              {blog.likes}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <form action={likeBlog}>
            <input type="hidden" name="id" value={blog.id} />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              👍 Like
            </button>
          </form>

          <form action={addToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Add to reading list
            </button>
          </form>

          <form action={deleteBlog}>
            <input type="hidden" name="id" value={blog.id} />

            <button
              type="submit"
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
            >
              🗑 Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BlogPage