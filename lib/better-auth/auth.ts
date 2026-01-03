import { betterAuth } from "better-auth";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let authInstance: ReturnType<typeof betterAuth> | null = null;


export const getAuth = async () => {
  if (authInstance) return authInstance;
  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDb connection not found");

  authInstance = betterAuth({
    database: mongodbAdapter(db as any),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [
      "http://localhost:3000",
      process.env.BETTER_AUTH_URL || "",
    ],
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
      },
    },
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    advanced: {
      cookies: {
        
        ...(process.env.NODE_ENV === "development"
          ? {
              state: {
                attributes: {
                  sameSite: "lax",
                  secure: false,
                },
              },
            }
          : {
              state: {
                attributes: {
                  sameSite: "none",
                  secure: true,
                },
              },
            }),
      },
    },
    plugins: [nextCookies()],
  });

  return authInstance;
};

export const auth = await getAuth();
