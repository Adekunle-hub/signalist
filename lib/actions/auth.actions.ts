"use server";

import { headers } from "next/headers";
import { getAuth } from "../better-auth/auth";
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
   
    const auth = await getAuth();
    const response = await auth.api.signUpEmail({
      body: {
        email,
        name: fullName,
        password,
      },
    });

    if (response instanceof Response) {
      console.log("   - Status:", response.status);
      console.log("   - Status Text:", response.statusText);
      console.log("   - OK?", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API returned error:", errorText);
        return {
          success: false,
          error: `Signup failed: ${errorText || response.statusText}`,
        };
      }

      // Parse the response
      const userData = await response.json();
      console.log("   - Parsed user data:", userData);

      // Send Inngest event
      if (userData) {
        try {
          console.log("4️⃣ Sending Inngest event...");
          await inngest.send({
            name: "app/user.created",
            data: {
              email,
              name: fullName,
              country,
              investmentGoals,
              preferedIndustry,
              riskTolerance,
            },
          });
          console.log("✅ Inngest event sent");
        } catch (inngestError) {
          console.error("⚠️ Inngest failed (continuing anyway):", inngestError);
        }
      }

      console.log("🎉 Returning success");
      return { success: true, data: userData };
    }

    // If not a Response object, handle as direct data
    console.log("4️⃣ Sending Inngest event...");
    if (response) {
      try {
        await inngest.send({
          name: "app/user.created",
          data: {
            email,
            name: fullName,
            country,
            investmentGoals,
            preferedIndustry,
            riskTolerance,
          },
        });
        console.log("✅ Inngest event sent");
      } catch (inngestError) {
        console.error("⚠️ Inngest failed (continuing anyway):", inngestError);
      }
    }

    console.log("🎉 Returning success");
    return { success: true, data: response };
  } catch (e) {
    console.error("❌❌❌ CATCH BLOCK EXECUTED ❌❌❌");
    console.error("Error type:", e?.constructor?.name);
    console.error("Error message:", e instanceof Error ? e.message : String(e));
    console.error(
      "Error stack:",
      e instanceof Error ? e.stack : "No stack trace"
    );
    console.error("Full error object:", e);

    return {
      success: false,
      error: e instanceof Error ? e.message : "sign up failed",
    };
  }
};

export const signOut = async () => {
  const auth = await getAuth();
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.log("sign out failed", error);
    return { success: false, error: "sign out failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  const auth = await getAuth();
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
  const auth = await getAuth();
  const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
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
