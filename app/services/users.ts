import { db } from "../../db"
import { eq } from "drizzle-orm"
import { users, readingList, blogs } from "../../db/schema"

export const getUsers = async () => {
    return db.query.users.findMany({
        with: { blogs: true }
    })
}

export const getUserById = async (id: number) => {
    return db.query.users.findFirst({
        where: eq(users.id, id),
        with: { blogs: true },
    })
}

export const getUserByUsername = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
        with: { blogs: true },
    })
}

export const getUserByToken = async (token: string) => {
    return db.query.users.findFirst({
        where: eq(users.token, token),
        with: { blogs: true }
    })
}

export const getReadingListByUserId = async (userId: number) => {
  return db
    .select()
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(eq(readingList.userId, userId))
}

const userService = {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByToken
}

export default userService