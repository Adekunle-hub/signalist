"use client";
import FooterLink from "@/components/FooterLink";
import ComboboxCountries from "@/components/forms/Countries";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { Button } from "@/components/ui/button";
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<signUpForm>();

  const onSubmit = async (data: signUpForm) => {
    try {
      const result = await signUpWithEmail(data);
      if (result.success) {
        toast.success("Account created successfully!");
        router.push("/");
      } else {
        toast.error("Sign up failed", {
          description: result.error || "Failed to create an account",
        });
      }
    } catch (error) {
      console.error("Sign up error:", error);
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
            type="email"
            register={register}
            validation={{
              required: "This is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
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
            validation={{
              required: "This is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            error={errors.password}
          />
        </div>
        <div>
          <SelectField
            placeholder="Growth"
            name="investmentGoals"
            label="Investment Goals"
            options={INVESTMENT_GOALS}
            register={register}
            validation={{ required: "Please select an investment goal" }}
            error={errors.investmentGoals}
          />
        </div>
        <div>
          <SelectField
            placeholder="Select your risk level"
            name="riskTolerance"
            label="Risk Tolerance"
            options={RISK_TOLERANCE_OPTIONS}
            register={register}
            validation={{ required: "Please select your risk tolerance" }}
            error={errors.riskTolerance}
          />
        </div>
        <div>
          <ComboboxCountries
            onCountryChange={(country) => setValue("country", country)}
          />
        </div>
        <div>
          <SelectField
            placeholder="Select your preferred industry"
            name="preferredIndustry"
            label="Preferred Industry"
            options={PREFERRED_INDUSTRIES}
            register={register}
            validation={{ required: "Please select a preferred industry" }}
            error={errors.preferedIndustry}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#FDD458] cursor-pointer hover:bg-[#FDD458]/90 text-black font-semibold disabled:opacity-50"
        >
          {isSubmitting
            ? "Creating Account..."
            : "Start Your Investing Journey"}
        </Button>
      </form>
      <FooterLink
        text="Already have an account?"
        action="Log In"
        link="/sign-in"
      />
      <GoogleSignInButton />
    </main>
  );
};

export default SignUp;
