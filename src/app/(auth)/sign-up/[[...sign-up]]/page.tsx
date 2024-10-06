"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { ClerkField } from "@/components/shared/form-field";
import { TextSeparator } from "@/components/shared/text-separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  return (
    <>
      <title>Register</title>

      <section className="w-[480px] py-6 px-4 bg-background rounded-3xl sm:p-8 sm:border">
        <SignUp.Root>
          <Clerk.Loading>
            {isGlobalLoading => (
              <>
                <SignUp.Step name="start" className="flex flex-col gap-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold sm:text-xl">Register</h1>

                    <div className="text-sm sm:text-base">
                      <span>Sudah punya akun?</span>{" "}
                      <Link href="/sign-in" className="font-medium">
                        Login
                      </Link>
                    </div>
                  </div>

                  <ClerkField name="firstName" label="Nama" />
                  <ClerkField name="emailAddress" label="Email" type="email" />
                  <ClerkField
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <ClerkField
                    name="confirmPassword"
                    label="Konfirmasi Password"
                    type="password"
                  />
                  <div className="mb-4">
                    <Label htmlFor="terms" className="text-base">
                      Terms & Conditions
                    </Label>
                    <div className="mt-2 flex items-center space-x-2">
                      <Checkbox id="terms" required />
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
                      <Icon icon="lucide:badge-check" className="size-4" />
                      <Clerk.Loading scope="provider:google">
                        {isLoading =>
                          isLoading ? "Loading..." : "Register with Google"
                        }
                      </Clerk.Loading>
                    </Button>
                  </Clerk.Connection>
                </SignUp.Step>

                <SignUp.Step
                  name="verifications"
                  className="flex flex-col gap-4"
                >
                  <SignUp.Strategy name="email_code">
                    <div className="mb-4">
                      <h1 className="text-2xl font-bold sm:text-xl">
                        Verifikasi Email
                      </h1>
                      <p className="text-sm text-muted-foreground text-balance">
                        Masukkan kode OTP yang dikirim ke email Anda.
                      </p>
                    </div>

                    <Clerk.Field
                      name="code"
                      className="space-y-2 overflow-x-hidden"
                    >
                      <Clerk.Label className="sr-only">
                        Email address
                      </Clerk.Label>
                      <Clerk.Input
                        type="otp"
                        className="flex justify-center has-[:disabled]:opacity-50"
                        autoSubmit
                        render={({ value, status }) => {
                          return (
                            <div
                              data-status={status}
                              className={cn(
                                "relative flex size-12 items-center justify-center sm:size-14",
                                "border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                {
                                  "z-10 ring-2 ring-ring ring-offset-background":
                                    status === "cursor" ||
                                    status === "selected",
                                },
                              )}
                            >
                              {value}
                              {status === "cursor" && (
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                  <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                </div>
                              )}
                            </div>
                          );
                        }}
                      />
                      <Clerk.FieldError className="block text-center text-sm text-destructive" />
                    </Clerk.Field>
                    <SignUp.Action
                      asChild
                      resend
                      className="text-muted-foreground"
                      fallback={({ resendableAfter }) => (
                        <Button variant="link" size="sm" disabled>
                          Belum menerima kode? Kirim ulang (
                          <span className="tabular-nums">
                            {resendableAfter}
                          </span>
                          )
                        </Button>
                      )}
                    >
                      <Button type="button" variant="link" size="sm">
                        Belum menerima kode? Kirim ulang
                      </Button>
                    </SignUp.Action>
                    <SignUp.Action submit asChild>
                      <Button disabled={isGlobalLoading}>
                        <Clerk.Loading>
                          {isLoading => (isLoading ? "Loading..." : "Continue")}
                        </Clerk.Loading>
                      </Button>
                    </SignUp.Action>
                  </SignUp.Strategy>
                </SignUp.Step>
              </>
            )}
          </Clerk.Loading>
        </SignUp.Root>
      </section>
    </>
  );
}
