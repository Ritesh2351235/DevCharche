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
import { SigninInput } from "@riteshhiremath/medium-common"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios from 'axios'


export const Auth2 = () => {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<SigninInput>({
    email: "",
    password: ""
  });



  async function sendrequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);

      // Check if there is a specific error message from the backend
      if (response.data.error === "User not found or invalid credentials") {
        throw new Error('Signin failed: User not found or invalid credentials');
      }

      // If successful, store the JWT
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blog");

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle axios-specific errors (e.g., server errors)
        console.error('Error response from server:', error.response?.data);
      } else {
        // Handle general errors (e.g., network or other unknown errors)
        console.error('Signin request failed:', (error as Error).message);
      }
    }
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle className="font-bold text-center">Sign In</CardTitle>
          <div className="flex">
            <CardDescription className="text-center ml-14">Don't have an account?</CardDescription>
            <Link to={"/Signup"} className="flex-col text-sm ml-1 text-slate-500 underline">
              Signup
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@gmail.com"
                  value={postInputs.email}
                  onChange={(e) => setpostInputs({ ...postInputs, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={postInputs.password}
                  onChange={(e) => setpostInputs({ ...postInputs, password: e.target.value })}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" onClick={sendrequest}>SignIn</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
