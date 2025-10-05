// lib/auth.ts (update your existing file)
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin as adminPlugin } from "better-auth/plugins"; // Rename to avoid conflict
import { Pool } from "pg";
import { ac, userRole, adminRole, moderatorRole } from "@/lib/permissions"; // Adjust path

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  }),
  tables: {
    user: "users",
    account: "accounts",
    session: "sessions",
    verificationToken: "verification_tokens",
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    adminPlugin({
      ac, // The access controller
      roles: {
        user: userRole,
        admin: adminRole,
        moderator: moderatorRole, // Your new role
      },
      // Optional: Set "moderator" as an admin-level role if it needs full access
      adminRoles: ["admin", "moderator"],
      // Keep your existing adminUserIds if needed
      adminUserIds: ["FJC8uLSzP91xiEWKcV68PecN1k5zM7Za", "kUGDWFDhTQM3xWK5AiH1QD8nxrm5tFHe"],
    }),
  ],
  trustedOrigins: [
    "https://client-zeta-rouge.vercel.app",
    "http://localhost:3000"
  ]
});