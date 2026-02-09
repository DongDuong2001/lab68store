import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redirect to products page
  redirect("/products");
}
