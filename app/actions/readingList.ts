"use server"

import { redirect } from "next/navigation"
import readingListService from "../services/readingLists"
import { revalidatePath } from "next/cache"
import { auth } from "../auth"
import { getCurrentUser } from "../services/session"

const checkAuth = async () => {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }
}

export const addToReadingList = async (formData: FormData) => {
    await checkAuth()

    const user = await getCurrentUser()
    if (!user) {
        redirect("/login")
    }

    const blogId = formData.get("blogId") as string

    await readingListService.addToReadingList(user.id, Number(blogId))

    revalidatePath("/blogs")
    revalidatePath(`/blogs/${blogId}`)
    redirect(`/blogs/${blogId}`)
}

export const markReadingListAsRead = async (formData: FormData) => {
    await checkAuth()

    const id = formData.get("id")

    await readingListService.markAsRead(Number(id))

    revalidatePath("/me")
}