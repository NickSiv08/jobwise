import { findUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OnboardingPageClient from "./OnboardingPageClient";

const OnboardingPage = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const response = await findUser();

  if (response?.exists) redirect("/dashboard");

  return <OnboardingPageClient />;
};

export default OnboardingPage;
