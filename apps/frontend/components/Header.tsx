import Image from "next/image";
import { Button } from "./ui/button";
function Header() {
  return (
    <div className="flex items-center justify-between m-4 bg-blend-darken ">
      <div className="">
        <Image src="" alt="logo" />
      </div>
      <div>
        <Button>Login</Button>
        <Button>SignUp</Button>
      </div>
    </div>
  );
}
export default Header;

