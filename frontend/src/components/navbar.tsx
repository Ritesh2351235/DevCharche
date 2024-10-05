import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between p-4 bg-background mb-2">
      <div className="flex items-center">
        <Link to="/blog" className="text-2xl font-extrabold">
          DevCharche
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/about" className="text-foreground hover:text-primary">
          About
        </Link>
        <Link to="/services" className="text-foreground hover:text-primary">
          Services
        </Link>
        <Link to="/contact" className="text-foreground hover:text-primary">
          Contact
        </Link>
        <Button onClick={() => {
          localStorage.setItem("token", "");
          navigate('/');
        }}>Log Out</Button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col space-y-4">
            <Link to="/about" className="text-foreground hover:text-primary">
              About
            </Link>
            <Link to="/services" className="text-foreground hover:text-primary">
              Services
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary">
              Contact
            </Link>
            <Button >Sign In</Button>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

