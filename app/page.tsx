import { Button } from "@/components/ui/button";
import { SignIn, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  return redirect("/onboarding");
}
