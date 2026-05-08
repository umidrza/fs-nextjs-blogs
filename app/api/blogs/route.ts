import { NextResponse } from "next/server"
import blogService from "../../services/blogs"

export const GET = async () => {
  const blogs = await blogService.getBlogs()
  return NextResponse.json(blogs)
}