import { eq } from "drizzle-orm"
import { db } from "../../db"
import { readingList } from "../../db/schema"

const addToReadingList = async (userId: number, blogId: number) => {
  const existing = await db.query.readingList.findFirst({
    where: (rl, { eq, and }) =>
      and(eq(rl.userId, userId), eq(rl.blogId, blogId)),
  })

  if (existing) {
    return existing
  }

  await db.insert(readingList).values({
    userId,
    blogId,
  })
}

const markAsRead = async (id: number) => {
  await db
    .update(readingList)
    .set({
      read: true,
    })
    .where(eq(readingList.id, id))
}

const readingListService = {
    addToReadingList,
    markAsRead
}

export default readingListService