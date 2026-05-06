import { notFound } from "next/navigation"
import blogService from "../../services/blogs"
import { likeBlog } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const blog = blogService.getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>URL: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
      <p>Likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </div>
  )
}

export default BlogPage