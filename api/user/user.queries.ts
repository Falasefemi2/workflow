import { useQuery, useMutation } from "@tanstack/react-query"
import { Effect } from "effect"
import { createUser, forgotPassword, getCurrentUser, getUserByEmail, getUserByID, getUsers, loginUser, logout, resetPassword } from "./user.api"
import { CreateUserPayload, ForgotPasswordPayload, GetUsersParams, LoginPayload, ResetPasswordPayload } from "./user.types"

export const useGetCurrentUser = () =>
    useQuery({
        queryKey: ["current-user"],
        queryFn: () => Effect.runPromise(getCurrentUser())
    })


export const useGetUserByID = (id: string) =>
    useQuery({
        queryKey: ["users", id],
        queryFn: () => Effect.runPromise(getUserByID(id))
    })

export const useGetUserByEmail = (email: string) =>
    useQuery({
        queryKey: ["users", "email", email],
        queryFn: () => Effect.runPromise(getUserByEmail({ email }))
    })

export const useGetUsers = (params: GetUsersParams) =>
    useQuery({
        queryKey: ["users", params],
        queryFn: () => Effect.runPromise(getUsers(params))
    })

export const useLoginUser = () =>
    useMutation({
        mutationFn: (payload: LoginPayload) =>
            Effect.runPromise(loginUser(payload))
    })

export const useForgotPassword = () =>
    useMutation({
        mutationFn: (payload: ForgotPasswordPayload) =>
            Effect.runPromise(forgotPassword(payload))
    })


export const useLogout = () =>
    useMutation({
        mutationFn: () =>
            Effect.runPromise(logout())
    })

export const useResetPassword = () =>
    useMutation({
        mutationFn: (payload: ResetPasswordPayload) =>
            Effect.runPromise(resetPassword(payload))
    })

export const useCreateUser = () =>
    useMutation({
        mutationFn: (payload: CreateUserPayload) =>
            Effect.runPromise(createUser(payload))
    })
