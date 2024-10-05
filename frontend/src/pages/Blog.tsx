import { Blogcard } from "../components/Blogcard"
import Navbar from "@/components/navbar"
import { useBlog } from "../hooks/index"

export const Blog = () => {

  const { loading, blogs } = useBlog();

  if (loading) {
    return <div>
      loading....
    </div>
  }

  return <>
    <Navbar></Navbar>
    <div className="justify-center flex flex-col items-center ">
      {blogs.map((blog) => (
        <Blogcard
          id={blog.id} 
          title={blog.title}
          author={blog.author.name || "Anoynomus"}
          content={blog.content}
        />
      ))}
    </div>
  </>

}
