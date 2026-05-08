"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "../../actions/blogs"
import { useRouter } from "next/navigation"
import { useNotification } from "../../components/NotificationContext"

const initialState = {
  errors: {
    title: "",
    author: "",
    url: "",
  },
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false,
}

const inputStyles =
  "rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  
const labelStyles =
  "text-sm font-semibold text-slate-700"

const errorStyles =
  "mt-1 text-sm text-rose-600"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created", "success")
      router.push("/blogs")
    }
  }, [state.success, showNotification, router])

  return (
    <div className="mx-auto mt-12 max-w-lg px-4 sm:px-6">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/40">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Create a new blog
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Share your thoughts with the community.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="title" className={labelStyles}>
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter blog title"
              defaultValue={state.values?.title}
              className={`${inputStyles} ${
                state.errors?.title
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : ""
              }`}
            />

            {state.errors?.title && (
              <p className={errorStyles}>
                {state.errors.title}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="author" className={labelStyles}>
              Author
            </label>

            <input
              id="author"
              name="author"
              type="text"
              placeholder="Enter author name"
              defaultValue={state.values?.author}
              className={`${inputStyles} ${
                state.errors?.author
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : ""
              }`}
            />

            {state.errors?.author && (
              <p className={errorStyles}>
                {state.errors.author}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="url" className={labelStyles}>
              URL
            </label>

            <input
              id="url"
              name="url"
              type="text"
              placeholder="https://example.com"
              defaultValue={state.values?.url}
              className={`${inputStyles} ${
                state.errors?.url
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : ""
              }`}
            />

            {state.errors?.url && (
              <p className={errorStyles}>
                {state.errors.url}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewBlog