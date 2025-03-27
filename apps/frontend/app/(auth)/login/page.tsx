import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className=" flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Login</CardTitle>
          <AuthForm type="login" />
        </CardHeader>
      </Card>
    </div>
  );
};
export default LoginPage;
