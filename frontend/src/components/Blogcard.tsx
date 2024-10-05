import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"

interface BlogCardcomponents {
  id: string,
  author: string,
  title: string,
  content: string
}
export const Blogcard = ({ author, title, content, id }: BlogCardcomponents) => {
  return <>
    <Link to={`/blog/${id}`}>
      <Card className="max-h-md my-1 w-[650px] ">
        <CardHeader>
          <div className="flex ">
            <div className="justify-center pl-2 mb-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            <CardDescription className="pl-2" >{author}</CardDescription>
          </div>
          <CardTitle className="font-extrabold pl-2">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center ">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-slate-500 ">{content.slice(0, 100) + "..."}</p>
              <div className="text-xs font-normal text-slate-500 mt-2">
                {Math.ceil(content.length / 100)} Minutes read
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

  </>
}