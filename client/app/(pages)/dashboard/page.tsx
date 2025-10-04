import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      redirect("/login"); // Or your login page
    }
    // Render dashboard with session.user.name, session.user.email, etc.
    return (
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        {/* Your dashboard content */}
      </div>
    );
  } catch (error) {
    console.error("Session error:", error);
    redirect("/login");
  }
}