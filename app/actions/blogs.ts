"use server"

import { redirect } from "next/navigation"
import blogService from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const url = formData.get("url") as string
    const userId = Number(formData.get("userId") as string)
    await blogService.addBlog(title, author, url, userId)

    revalidatePath("/blogs")
    redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
    const id = formData.get("id") as string
    await blogService.likeBlog(Number(id))

    revalidatePath("/blogs")
    revalidatePath(`/blogs/${id}`)
    redirect(`/blogs/${id}`)
}

export const deleteBlog = async (formData: FormData) => {
    const id = formData.get("id") as string
    await blogService.deleteBlog(Number(id))
    revalidatePath("/blogs")
    redirect("/blogs")
}