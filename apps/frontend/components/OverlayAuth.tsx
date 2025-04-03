"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
interface OverlayProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const OverlayAuth = ({ setIsModalOpen }: OverlayProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-white text-center">
          Sign in to continue
        </h2>
        <p className="text-gray-300 text-center mt-2">
          Create an account or sign in to send messages
        </p>
        <div className="flex gap-4 mt-6 justify-center">
          <SignInButton>
            <Button className="bg-transparent border-2 border-white text-white hover:bg-white/20">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button className="bg-white text-black hover:bg-white/90">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
        <Button
          variant="ghost"
          className="mt-4 w-full text-gray-400 hover:text-white hover:bg-black hover:border-amber-50"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default OverlayAuth;
