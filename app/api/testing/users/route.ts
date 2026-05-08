import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

import { db } from "@/db"
import { users } from "@/db/schema"

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const body = await request.json()

  const passwordHash = await bcrypt.hash(body.password, 10)

  const [user] = await db
    .insert(users)
    .values({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    .returning()

  return NextResponse.json(user, { status: 201 })
}