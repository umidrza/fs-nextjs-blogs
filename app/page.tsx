const Home = () => {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          Blogs app
        </h2>

        <p className="mt-4 text-gray-600">
          An example app for{" "}
          <a
            href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            Full Stack Open Next.js
          </a>
        </p>
      </div>
    </div>
  )
}

export default Home