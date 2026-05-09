"use client"

import { useTransition } from "react"
import { generateApiToken } from "../actions/users"

export default function TokenButton() {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      generateApiToken()
    })
  }

  return (
    <button
      data-testid="generate-token-button"
      onClick={handleClick}
      disabled={isPending}
      className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
    >
      {isPending ? "Generating..." : "Generate new token"}
    </button>
  )
}