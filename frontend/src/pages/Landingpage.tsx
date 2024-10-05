
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const LandingPage = () => {
  const navigate = useNavigate();
  return <>
    <div className="bg-black  justify-center items-center text-left flex flex-col h-screen w-full text-6xl font-extrabold text-slate-300">
      DevCharche
      <p className="font-thin text-lg flex ">Share, Learn, and Grow with Developer Insights</p>
      <div className="flex justify-evenly my-3">
        <Button className="mr-3 py-2 px-6" variant="secondary" onClick={() => navigate('/signup')}>Sign Up</Button>
        <Button className="ml-3 py-2 px-6" variant="secondary" onClick={() => navigate('/signin')}>Sign In</Button>
      </div>
    </div>


  </>
}