import Link from "next/link"
import blogService from "../services/blogs"

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter?: string }> }) => {
  const allBlogs = await blogService.getBlogs()
  const { filter } = await searchParams

  const blogs = filter
    ? allBlogs.filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase()))
    : allBlogs

  return (
    <div>
      <form>
        <input type="text" name="filter" placeholder="Filter by title" defaultValue={filter} />
        <button type="submit">Apply Filter</button>
      </form>

      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <h3>{blog.title}</h3>
              <p>By {blog.author}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs