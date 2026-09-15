"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, CircleUser } from "lucide-react";
import StepIndicator from "@/components/onboarding/StepIndicator";
import RoleChoice from "@/components/onboarding/RoleChoice";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Link from "next/link";

const userSchema = z.object({
  firstName: z
    .string()
    .min(2, "First Name is required")
    .max(40, "First name too long"),
  lastName: z
    .string()
    .min(2, "First Name is required")
    .max(40, "First name too long"),
  phone: z.string().min(10, "Phone number required"),
});

const OnboardingPageClient = () => {
  const userForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"CANDIDATE" | "EMPLOYER" | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = (data: any) => {
    console.log(data);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPhone(data.phone);
    setStep(3);
  };

  return (
    <div className="min-h-screen">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Image src="/logo.png" alt="logo" width={80} height={80} />
        {/* <h1 className="text-5xl font-semibold tracking-wide">
          <span>Job</span>
          <span className="text-primary">Wise</span>
        </h1> */}
        <SignOutButton>
          <Button className="p-4">Back to Sign In</Button>
        </SignOutButton>
      </div>

      <div className="flex flex-col items-center justify-center m-8">
        <StepIndicator currentStep={step} />
      </div>

      {step === 1 && (
        <div className="mt-16 px-12 flex flex-col items-center gap-23">
          <h1 className="text-6xl font-semibold tracking-tight text-center">
            Create your account
          </h1>
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl font-bold tracking-tight">I am a...</h1>
            <div className="flex flex-col md:flex-row gap-23 md:mx-10 lg:mx-40">
              <RoleChoice
                title="Job Seeker"
                isActive={role === "CANDIDATE"}
                onClick={() => setRole("CANDIDATE")}
                icon="onboarding-candidate"
                description="Find jobs, apply to positions and manage your applications"
              />
              <RoleChoice
                title="Employer"
                isActive={role === "EMPLOYER"}
                onClick={() => setRole("EMPLOYER")}
                icon="onboarding-employer"
                description="Post jobs, find talents and manage your hiring proces"
              />
            </div>

            {role && (
              <Button
                className="mt-6 p-6 w-full md:w-[50%] text-xl mb-12"
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mx-12 space-y-14">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-5xl font-semibold">
              Tell us more about yourself
            </h1>
          </div>

          <form
            id="user-form"
            className="lg:mx-32 xl:mx-64 2xl:mx-90"
            onSubmit={userForm.handleSubmit(onSubmit)}
          >
            <FieldGroup className="grid sm:grid-cols-2">
              <Controller
                name="firstName"
                control={userForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      First Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="firstName"
                      aria-invalid={fieldState.invalid}
                      placeholder="John"
                      autoComplete="off"
                      className="border-gray-300 focus-visible:ring-0 focus-visible:border-gray-300"
                    />
                    {fieldState.invalid && (
                      <FieldError
                        className="text-red-700"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={userForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Last Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="lastName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Doe"
                      autoComplete="off"
                      className="border-gray-300 focus-visible:ring-0 focus-visible:border-gray-300"
                    />
                    {fieldState.invalid && (
                      <FieldError
                        className="text-red-700"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={userForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <PhoneInput
                      className="p-2 border border-gray-300 rounded-lg"
                      international
                      defaultCountry="GR"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        className="text-red-700"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <div className="mt-8 flex gap-3">
              <Button
                variant="outline"
                className="text-gray-600"
                onClick={() => {
                  setFirstName("");
                  setLastName("");
                  setPhone("");
                  userForm.reset();
                  setStep(1);
                }}
              >
                <ArrowLeft />
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OnboardingPageClient;
