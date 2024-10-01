"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { ClerkField } from "@/components/shared/form-field";
import { TextSeparator } from "@/components/shared/text-separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <>
      <title>Procoyte | Login</title>

      <section className="w-[480px] py-6 px-4 bg-background rounded-3xl sm:p-8 sm:border">
        <SignIn.Root>
          <Clerk.Loading>
            {isGlobalLoading => (
              <>
                <SignIn.Step name="start" className="flex flex-col gap-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold sm:text-xl">Login</h1>

                    <div className="text-sm sm:text-base">
                      <span>Belum punya akun?</span>{" "}
                      <Link href="/sign-up" className="font-medium">
                        Register
                      </Link>
                    </div>
                  </div>

                  <ClerkField name="identifier" label="Email" type="email" />
                  <ClerkField
                    name="password"
                    label="Password"
                    type="password"
                    suffixLabel={
                      <Link href="/forgot-password" className="underline">
                        Forgot your password?
                      </Link>
                    }
                  />
                  <div className="mt-2 mb-4 flex items-center space-x-2">
                    <Checkbox id="rememberMe" />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </Label>
                  </div>

                  <SignIn.Action submit asChild>
                    <Button className="w-full" disabled={isGlobalLoading}>
                      <Clerk.Loading>
                        {isLoading => {
                          return isLoading ? "Loading..." : "Login";
                        }}
                      </Clerk.Loading>
                    </Button>
                  </SignIn.Action>

                  <TextSeparator>OR CONTINUE WITH</TextSeparator>

                  <Clerk.Connection name="google" asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={isGlobalLoading}
                    >
                      <Icon icon="lucide:badge-check" className="size-4" />
                      <Clerk.Loading scope="provider:google">
                        {isLoading =>
                          isLoading ? "Loading..." : "Login with Google"
                        }
                      </Clerk.Loading>
                    </Button>
                  </Clerk.Connection>
                </SignIn.Step>
              </>
            )}
          </Clerk.Loading>
        </SignIn.Root>
      </section>
    </>
  );
}
