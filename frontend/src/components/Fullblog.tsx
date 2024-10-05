
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Blog } from "../hooks/index"


export default function FullBlog({ blog }: { blog: Blog }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full h-full md:w-2/3">
          <Card className="min-h-max">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {blog.content}
              </p>

            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Author</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Author" />
                  <AvatarFallback>RH</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{blog.author.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Web Developer & Tech Enthusiast
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                Jane is a seasoned web developer with over a decade of experience in building scalable web applications. She's passionate about emerging technologies and their impact on the future of web development.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}