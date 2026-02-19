import { cn } from "@/lib/utils";
import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Password Reset</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your new password below
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="confirmPassword">
                    Re-enter New Password
                  </FieldLabel>
                  <NavLink
                    to="/"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Back to login
                  </NavLink>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* Image Section */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Reset password"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
