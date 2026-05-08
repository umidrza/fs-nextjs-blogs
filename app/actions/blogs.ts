"use server"

import { redirect } from "next/navigation"
import blogService from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "../auth"

const checkAuth = async () => {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }
}

export const createBlog = async (prevState: { errors: Record<string, string> }, formData: FormData) => {
    await checkAuth()

    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const url = formData.get("url") as string

    const errors: Record<string, string> = {}

    if (!title || title.length < 5) {
        errors.title = "Title must be at least 5 characters"
    }

    if (!author || author.length < 5) {
        errors.author = "Author must be at least 5 characters"
    }

    if (!url || url.length < 5) {
        errors.url = "URL must be at least 5 characters"
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors,
            values: { title, author, url },
            success: false
        }
    }

    await blogService.addBlog(title, author, url)

    revalidatePath("/blogs")
    return { errors, values: { title, author, url }, success: true }
}

export const likeBlog = async (formData: FormData) => {
    await checkAuth()

    const id = formData.get("id") as string
    await blogService.likeBlog(Number(id))

    revalidatePath("/blogs")
    revalidatePath(`/blogs/${id}`)
    redirect(`/blogs/${id}`)
}

export const deleteBlog = async (formData: FormData) => {
    await checkAuth()

    const id = formData.get("id") as string
    await blogService.deleteBlog(Number(id))
    revalidatePath("/blogs")
    redirect("/blogs")
}