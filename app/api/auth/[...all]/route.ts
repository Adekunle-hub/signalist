import { auth } from "@/lib/better-auth/auth";       // your Better Auth config
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
