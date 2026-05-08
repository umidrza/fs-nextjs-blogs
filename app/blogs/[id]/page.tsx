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
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/40">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            {blog.title}
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            By{" "}
            <span className="font-medium text-slate-900">
              {blog.author}
            </span>
          </p>
        </div>

        <div className="space-y-4 text-slate-700">
          <div>
            <span className="font-semibold text-slate-900">
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
            <span className="font-semibold text-slate-900">
              Likes:
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
              {blog.likes}
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <form action={likeBlog}>
            <input type="hidden" name="id" value={blog.id} />

            <button
              type="submit"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              👍 Like
            </button>
          </form>

          <form action={addToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />

            <button
              type="submit"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Add to reading list
            </button>
          </form>

          <form action={deleteBlog}>
            <input type="hidden" name="id" value={blog.id} />

            <button
              type="submit"
              className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 active:scale-[0.98]"
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