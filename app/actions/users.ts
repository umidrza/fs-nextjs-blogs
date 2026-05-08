"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import userService from "../services/users"
import { auth } from "@/app/auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const registerUser = async (prevState: { errors: Record<string, string> }, formData: FormData) => {
  const errors: Record<string, string> = {}

  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const existingUser = await userService.getUserByUsername(username)

  if (existingUser) {
    errors.username = "Username already exists"
  }

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters"
  }

  if (!name || name.length < 4) {
    errors.name = "Name must be at least 4 characters"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name, password, passwordConfirm }
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}

export async function generateApiToken() {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const token = crypto.randomUUID()

  await db
    .update(users)
    .set({ token })
    .where(eq(users.username, session.user.email))

  revalidatePath("/me")

  return { token }
}