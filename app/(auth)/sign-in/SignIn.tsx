"use client";

import FooterLink from "@/components/FooterLink";
import InputField from "@/components/forms/InputField";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to create an account",
      });
    }
  };

  return (
    <main className="mt-8">
      <h1 className="text-white text-xl font-semibold">Welcome Back</h1>
      <p className="text-sm text-white/70 mt-1">
        Sign in to continue your investing journey
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-y-4"
      >
        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          register={register}
          validation={{ required: "Email is required" }}
          error={errors.email}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          validation={{ required: "Password is required" }}
          error={errors.password}
        />

        <Button
          type="submit"
          className="bg-[#FDD458] cursor-pointer hover:bg-[#FDD458]/90 text-black font-semibold"
        >
          Sign In
        </Button>
      </form>

      <FooterLink
        text="Don’t have an account?"
        action="Sign Up"
        link="/sign-up"
      />
       <GoogleSignInButton/>
    </main>
  );
};

export default SignIn;
