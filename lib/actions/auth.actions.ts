"use server";

import { headers } from "next/headers";
import { auth, getAuth } from "../better-auth/auth";
import { inngest } from "../inngest/client";
import { createAuthClient } from "better-auth/client";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  preferedIndustry,
  country,
  investmentGoals,
  riskTolerance,
}: signUpForm) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        name: fullName,
        password,
      },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          password,
          name: fullName,
          country,
          investmentGoals,
          preferedIndustry,
          riskTolerance,
        },
      });
    }

    return { success: true, data: response };
  } catch (e) {
    console.log("sign up failed", e);
    return { success: false, error: "sign up failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.log("sign out failed", error);
    return { success: false, error: "sign out failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, data: response };
  } catch (e) {
    console.log("sign up failed", e);
    return { success: false, error: "sign up failed" };
  }
};

export const signInWithGoogle = async () => {
  const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  });
  

  try {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    console.log("Sign in success", data);
    return data;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
