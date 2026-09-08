import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (user) redirect("/");

  return (
    <div className="h-screen overflow-hidden flex">
      <div className="w-full md:w-1/2 overflow-y-auto p-16">{children}</div>

      <div className="relative hidden md:block md:w-1/2 h-full overflow-hidden">
        <Image
          src="/auth-page.png"
          alt="Auth Page"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
