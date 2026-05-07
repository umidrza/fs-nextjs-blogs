import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"
import { getCurrentUser } from "./session"

const getBlogs = () => {
  return db.query.blogs.findMany()
}

const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  return db.insert(blogs)
    .values({ title, author, url, likes: 0, userId: user.id })
    .returning()
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