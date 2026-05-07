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

export const createBlog = async (formData: FormData) => {
    await checkAuth()

    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const url = formData.get("url") as string
    await blogService.addBlog(title, author, url)

    revalidatePath("/blogs")
    redirect("/blogs")
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