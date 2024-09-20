"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";

import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUpPage() {
  return (
    <section className="w-[480px] p-8 bg-background border rounded-3xl">
      <div className="mb-8 flex justify-between">
        <h1 className="text-xl font-bold">Register</h1>

        <div>
          <span>Sudah punya akun?</span>{" "}
          <Link href="/sign-in" className="font-medium">
            Login
          </Link>
        </div>
      </div>

      <SignUp.Root>
        <Clerk.Loading>
          {isGlobalLoading => (
            <SignUp.Step name="start" className="space-y-4">
              <FormField name="name" label="Nama" />
              <FormField name="email" label="Email" type="email" />
              <FormField name="password" label="Password" type="password" />
              <FormField
                name="confirmPassword"
                label="Konfirmasi Password"
                type="password"
              />
              <div className="mb-4">
                <label htmlFor="terms">Terms & Conditions</label>
                <div className="mt-2 flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree with the terms & conditions
                  </label>
                </div>
              </div>

              <SignUp.Captcha className="empty:hidden" />
              <SignUp.Action submit asChild>
                <Button className="mt-4 w-full" disabled={isGlobalLoading}>
                  <Clerk.Loading>
                    {isLoading => {
                      return isLoading ? "Loading..." : "Register";
                    }}
                  </Clerk.Loading>
                </Button>
              </SignUp.Action>

              <div className="flex items-center gap-2.5">
                <div className="flex-grow border-t border" />
                <p className="text-xs text-muted-foreground">
                  OR CONTINUE WITH
                </p>
                <div className="flex-grow border-t border" />
              </div>

              <Clerk.Connection name="google" asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isGlobalLoading}
                >
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
  );
}
