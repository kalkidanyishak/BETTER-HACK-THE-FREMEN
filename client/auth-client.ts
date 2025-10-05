import { createAuthClient } from "better-auth/client"
import type { auth } from "./lib/auth"
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  plugins: [
    inferAdditionalFields<typeof auth>(), // infers extra fields from your auth setup
    adminClient()                        // enables admin capabilities
  ],
})
