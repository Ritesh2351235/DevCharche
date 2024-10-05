import { useParams } from "react-router-dom";
import { Blog, useBlogpage } from "../hooks/index";
import FullBlog from "@/components/Fullblog";
import Navbar from "@/components/navbar";




export const Blogpage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlogpage({
    id: id || "",
  });


  if (loading) {
    return <div>loading....</div>;
  }

  const defaultBlog: Blog = {
    id: "1",
    title: "Untitled",
    content: "No content available",
    author: {
      name: "Unknown author",
    },
  };

  return (
    <>
    <Navbar></Navbar>
      <FullBlog blog ={blog || defaultBlog}
      ></FullBlog>
    </>
  );
};
