import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className=" flex items-center justify-center min-h-screen bg-[#f3f3f3] ">
      <Card className="w-full max-w-md shadow-md rounded-2xl border-2 border-white bg-white/20 backdrop-blur-3xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Login</CardTitle>
          <AuthForm type="login" />
        </CardHeader>
      </Card>
    </div>
  );
};
export default LoginPage;
