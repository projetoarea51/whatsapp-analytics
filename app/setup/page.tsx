import { redirect } from "next/navigation"

export default function SetupPage() {
  // Redirect to the first step of the setup wizard
  redirect("/setup/workspace")
}
