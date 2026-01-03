"use client";
import FooterLink from "@/components/FooterLink";
import ComboboxCountries from "@/components/forms/Countries";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<signUpForm>();

  const onSubmit = async (data: signUpForm) => {
    try {
      const result = await signUpWithEmail(data);
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
    <main className=" mt-8">
      <h1 className="text-white text-xl font-semibold">
        Sign Up and Personalize
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-y-4"
      >
        <div>
          <InputField
            name="fullName"
            label="Full Name"
            placeholder="Enter your name..."
            type="text"
            register={register}
            validation={{ required: "This is required" }}
            error={errors.fullName}
          />
        </div>
        <div>
          <InputField
            name="email"
            label="Email"
            placeholder="Enter your Email..."
            type="text"
            register={register}
            validation={{ required: "This is required" }}
            error={errors.email}
          />
        </div>
        <div>
          <InputField
            name="password"
            label="Password"
            placeholder="Enter a strong password"
            type="password"
            register={register}
            validation={{ required: "This is required" }}
            error={errors.password}
          />
        </div>
        <div>
          <SelectField
            placeholder="Growth"
            name="Investment Goals"
            options={INVESTMENT_GOALS}
            register={register}
          />
        </div>
        <div>
          <SelectField
            placeholder="Select your risk level"
            name="Risk Tolerance"
            options={RISK_TOLERANCE_OPTIONS}
            register={register}
          />
        </div>
        <div>
          <ComboboxCountries />
        </div>

        <div>
          <SelectField
            placeholder="Select your preferred industry"
            name="Preferred Industry"
            options={PREFERRED_INDUSTRIES}
            register={register}
          />
        </div>
        <Button
          type="submit"
          className="bg-[#FDD458] cursor-pointer hover:bg-[#FDD458]/90 text-black font-semibold"
        >
          Start Your Investing Journey
        </Button>
      </form>

      <FooterLink
        text="Already have an account?"
        action="Log In"
        link="/sign-in"
      />
      <GoogleSignInButton/>
    </main>
  );
};

export default SignUp;
