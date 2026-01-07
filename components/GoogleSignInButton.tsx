"use client";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/client";
import { Button } from "./ui/button";

const GoogleSignInButton = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const authClient = createAuthClient({
        baseURL:
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      });

      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      console.log("Sign in initiated", data);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Button
      className="w-full flex items-center cursor-pointer justify-center gap-3 bg-white text-black hover:bg-gray-100"
      onClick={handleGoogleSignIn}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
