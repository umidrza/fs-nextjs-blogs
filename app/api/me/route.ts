import { NextResponse } from "next/server"
import userService from "@/app/services/users"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid Authorization header" },
      { status: 401 }
    )
  }

  const token = authHeader.replace("Bearer ", "").trim()

  if (!token) {
    return NextResponse.json(
      { error: "Token missing" },
      { status: 401 }
    )
  }

  const user = await userService.getUserByToken(token)

  if (!user) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    username: user.username,
    blogs: user.blogs,
  })
}