import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  }),
  tables: {
    user: "users", // Avoids reserved 'user' keyword
    account: "accounts", // Optional: Customize others for consistency
    session: "sessions",
    verificationToken: "verification_tokens",
  },
  emailAndPassword: {
    enabled: true,
  },
   plugins: [nextCookies()],
   trustedOrigins:["https://client-zeta-rouge.vercel.app", "http://localhost:3000"]
});
