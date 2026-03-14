import { cn } from "@/lib/utils";
import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import { useResetPassword } from "../../api/user/user.queries";
import { toast } from "sonner";

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    console.log("token from URL:", token);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const { mutate, isPending } = useResetPassword();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast("Passwords do not match");
            return;
        }

        if (!token) {
            toast("Invalid or missing token");
            return;
        }

        mutate(
            { token: token!, new_password: newPassword },
            {
                onSuccess: () => {
                    toast.success("Password reset successful");
                    navigate("/");
                },
                onError: () => {
                    toast.error("Failed to reset password. Try again.");
                },
            }
        );
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
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
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
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
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? "Resetting..." : "Reset Password"}
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
