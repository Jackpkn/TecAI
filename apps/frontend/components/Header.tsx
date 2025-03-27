import Image from "next/image";
import { Button } from "./ui/button";
import logo from "../public/logo.svg";
import Link from "next/link";
function Header() {
  let user = 0;

  return (
    <div className="w-full flex justify-center items-center ">
      <header className="flex h-19 items-center justify-between px-3 sm:px-8 rounded-4xl border-2 border-white bg-white/10 backdrop-blur-lg fixed top-3   z-50 w-2/3 shadow-md overflow-hidden">
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
    </div>
  );
}
export default Header;
