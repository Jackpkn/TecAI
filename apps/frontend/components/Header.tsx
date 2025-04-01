import Image from "next/image";
import { Button } from "./ui/button";
import logo from "../public/logo.svg";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
function Header() {
  let user = 0;

  return (
    <div className="w-full items-cente flex justify-center">
      <header className="flex  items-center justify-between p-4 gap-4 h-16  px-3 sm:px-8 rounded-4xl border-2 border-white bg-white/10 backdrop-blur-lg fixed top-3   z-50 w-2/3 shadow-md overflow-hidden">
        <Link href="/">
          <div className="flex items-center">
            <Image src={logo} alt="logo" width={50} height={50} />
            <h1>TechAI</h1>
          </div>
        </Link>

        <div className="flex gap-4">
          <SignedOut>
            <SignInButton>
              <Button> Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button> Sign up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
    </div>
  );
}
export default Header;
