import { cn } from "@/lib/utils";
import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useForgotPassword } from "../../api/user/user.queries";


export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const forgotPassword = useForgotPassword();
    const [email, setEmail] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await forgotPassword.mutateAsync({ email });

            toast.success(res.data.message);

            setEmail("");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                "Something went wrong"
            );
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Password Reset</h1>
                                <p className="text-muted-foreground text-balance">
                                    Enter the email address associated with your account below.
                                </p>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <NavLink
                                        to="/"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Login Instead
                                    </NavLink>
                                </div>
                            </Field>

                            <Field>
                                <Button
                                    type="submit"
                                    disabled={forgotPassword.isPending}
                                    className="w-full"
                                >
                                    {forgotPassword.isPending
                                        ? "Sending reset link..."
                                        : "Password Reset"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>

                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
