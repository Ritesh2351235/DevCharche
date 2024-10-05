import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { SignupInput } from "@riteshhiremath/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = () => {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  })

  async function sendrequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);

      if (response.status === 404) {
        throw new Error('Invalid input values');
      }

      const jwt = response.data.jwt;
      if (jwt) {
        localStorage.setItem("token", jwt);
        navigate("/blog");
      } else {
        throw new Error('Signup failed');
      }

    } catch (e: any) {
      if (e.response) {
        // Handle errors from the server
        console.error('Error response from server:', e.response.data);
      } else {
        // Handle general errors (network, etc.)
        console.error('Request failed:', e.message);
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle className="font-bold text-center">Create Account</CardTitle>
          <div className="flex">
            <CardDescription className="text-center ml-14" >Already have an account?</CardDescription>
            <Link to={"/Signin"} className="flex-col text-sm ml-1 text-slate-500 underline
            ">login</Link>
          </div>


        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input id="name" placeholder="Enter your Username" onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    name: e.target.value
                  })
                }} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Email</Label>
                <Input id="email" placeholder="m@gmail.com" onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    email: e.target.value
                  })
                }} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Password</Label>
                <Input id="password" type={"password"} onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    password: e.target.value
                  })
                }} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" onClick={sendrequest}>SignUp</Button>
        </CardFooter>
      </Card>
    </div>

  )

}