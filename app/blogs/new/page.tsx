"use client"

import { useActionState } from "react"
import { createBlog } from "../../actions/blogs"

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
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <div>
      <h2>Create a new blog</h2>

      <form action={formAction}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values?.title}
          />
          {state.errors?.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={state.values?.author}
          />
          {state.errors?.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
        </div>

        <div>
          <label htmlFor="url">URL</label>
          <input
            id="url"
            name="url"
            type="text"
            defaultValue={state.values?.url}
          />
          {state.errors?.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog