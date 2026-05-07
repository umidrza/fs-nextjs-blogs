import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

const getBlogs = () => {
  return db.query.blogs.findMany()
}

const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

const addBlog = (title: string, author: string, url: string) => {
  return db.insert(blogs).values({ title, author, url, likes: 0 })
}

const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)

  if (!blog) {
    return null
  }

  return db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))
    .returning()
}

const deleteBlog = async (id: number) => {
  const blog = await getBlogById(id)

  if (!blog) {
    return null
  }

  return db.delete(blogs).where(eq(blogs.id, id))
}

const blogService = {
  getBlogs,
  getBlogById,
  addBlog,
  likeBlog,
  deleteBlog,
}

export default blogService