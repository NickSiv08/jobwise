import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-semibold">Welcome to</h1>
      <h1 className="text-primary text-5xl font-semibold">JobWise</h1>
      <SignUp
        routing="hash"
        appearance={{
          options: {
            elevation: "flush",
          },
          variables: {
            colorPrimary: "#3B82F6",
            colorBackground: "#ffffff",
            colorForeground: "#0f172a",
            colorMutedForeground: "#64748b",
            colorPrimaryForeground: "#FFFFFF",
            borderRadius: "0.75rem",
          },

          elements: {
            card: "shadow-none! border-0",
            headerTitle: "text-2xl font-semibold",
            headerSubtitle: "text-slate-500",

            formButtonPrimary:
              "bg-blue-500 hover:bg-blue-600 text-white shadow-none",

            formFieldInput:
              "border-slate-200 focus:border-blue-400 focus:ring-blue-400",

            footerActionLink: "text-blue-500 hover:text-blue-600",

            socialButtonsBlockButton:
              "border-slate-200 hover:bg-slate-50 shadow-none",
            footerAction: {
              display: "none",
            },
          },
        }}
        fallbackRedirectUrl="/"
      />

      <div className="flex gap-2">
        <p className="text-gray-500">Already have an account ?</p>
        <Link href="/sign-in" className="text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
