"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

import { FormField } from "@/components/shared/form-field";
import { TextSeparator } from "@/components/shared/text-separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  return (
    <>
      <title>Procoyte | Register</title>

      <section className="w-[480px] py-6 px-4 bg-background rounded-3xl sm:p-8 sm:border">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold sm:text-xl">Register</h1>

          <div className="text-sm sm:text-base">
            <span>Sudah punya akun?</span>{" "}
            <Link href="/sign-in" className="font-medium">
              Login
            </Link>
          </div>
        </div>

        <SignUp.Root>
          <Clerk.Loading>
            {isGlobalLoading => (
              <SignUp.Step name="start" className="flex flex-col gap-4">
                <FormField name="name" label="Nama" />
                <FormField name="email" label="Email" type="email" />
                <FormField name="password" label="Password" type="password" />
                <FormField
                  name="confirmPassword"
                  label="Konfirmasi Password"
                  type="password"
                />
                <div className="mb-4">
                  <Label htmlFor="terms" className="text-base">
                    Terms & Conditions
                  </Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree with the terms & conditions
                    </Label>
                  </div>
                </div>

                <SignUp.Captcha className="empty:hidden" />
                <SignUp.Action submit asChild>
                  <Button className="w-full" disabled={isGlobalLoading}>
                    <Clerk.Loading>
                      {isLoading => {
                        return isLoading ? "Loading..." : "Register";
                      }}
                    </Clerk.Loading>
                  </Button>
                </SignUp.Action>

                <TextSeparator>OR CONTINUE WITH</TextSeparator>

                <Clerk.Connection name="google" asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isGlobalLoading}
                  >
                    <BadgeCheck width={16} height={16} />
                    <Clerk.Loading scope="provider:google">
                      {isLoading =>
                        isLoading ? "Loading..." : "Register with Google"
                      }
                    </Clerk.Loading>
                  </Button>
                </Clerk.Connection>
              </SignUp.Step>
            )}
          </Clerk.Loading>
        </SignUp.Root>
      </section>
    </>
  );
}
