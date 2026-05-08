"use client"

import Homepage from "./homepage.mdx"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-50 p-10 shadow-xl shadow-slate-200/50">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              Next.js Blog App
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Discover blogs, manage reading lists, and stay signed in.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              This starter app uses modern Next.js patterns with authentication, dynamic blog listings, and a personalized reading list experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
              >
                Browse blogs
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Login
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-2xl font-semibold text-slate-900">Read the latest posts</h2>
            <p className="mt-4 text-slate-600">
              Visit the blogs page to filter and explore posts with author details and quick navigation to each article.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-2xl font-semibold text-slate-900">Manage your profile</h2>
            <p className="mt-4 text-slate-600">
              Sign in to access your profile page, reading list, and API token features for a personalized experience.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3 text-sm font-semibold text-slate-600">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">★</span>
            App details and quick links
          </div>
          <div className="max-w-none space-y-6 text-slate-700">
            <Homepage />
          </div>
        </section>
      </div>
    </main>
  )
}