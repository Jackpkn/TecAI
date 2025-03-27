import Image from "next/image";
import { Button } from "./ui/button";
import logo from "../public/logo.svg";
import Link from "next/link";
function Header() {
  let user = 0;

  return (
    <header className="flex h-24 w-full items-center justify-between px-3 sm:px-8 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md fixed top-0 left-0 right-0 z-50  ">
      <Link href="/">
        <div className="flex items-center">
          <Image src={logo} alt="logo" width={50} height={50} />
          <h1>TechAI</h1>
        </div>
      </Link>
      <div className=" flex gap-4">
        {user ? (
          <div>Logout</div>
        ) : (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-white text-black border-2">
              <Link href="/register">SignUp</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
