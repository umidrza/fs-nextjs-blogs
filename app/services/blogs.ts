const blogs = [
  { 
    id: 1, 
    title: "next.js is a React framework",
    author: "John Doe",
    url: "https://nextjs.org",
    likes: 10,
  },
  { 
    id: 2, 
    title: "React is a JavaScript library",
    author: "Jane Smith",
    url: "https://reactjs.org",
    likes: 20,
  },
  {
    id: 3,
    title: "Next.js supports both static and dynamic rendering",
    author: "John Doe",
    url: "https://nextjs.org",
    likes: 15,
  },
]

let nextId = 4

const getBlogs = () => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const getBlogById = (id: number) => {
  return blogs.find(blog => blog.id === id)
}

const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

const likeBlog = (id: number) => {
  const blog = getBlogById(id)
  if (blog) {
    blog.likes += 1
  }
}

const blogService = {
  getBlogs,
  getBlogById,
  addBlog,
  likeBlog,
}

export default blogService