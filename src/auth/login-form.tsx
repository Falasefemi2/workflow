import { cn } from "@/lib/utils";
import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router";
import { useLoginUser } from "../../api/user/user.queries";
import { useState } from "react";
import type { ApiError } from "api/user/user.types";


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const login = useLoginUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and Password are required");
            return;
        }

        try {
            await login.mutateAsync({ email, password });
            navigate("/dashboard/admin");
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.error ?? "Login failed");
        }
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your workflow account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <NavLink
                                        to="/forgot-password"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot password?
                                    </NavLink>
                                </div>
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Field>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Field>
                                <Button type="submit">Login</Button>
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
