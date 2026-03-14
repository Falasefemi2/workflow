import { Effect } from "effect"
import type { ApiError, ApiResponse, CreateUserPayload, CurrentUser, ForgotPasswordPayload, GetUserByEmail, GetUsersParams, LoginPayload, ResetPasswordPayload, UpdateUserPayload, User, } from "./user.types"
import apiClient from "../client"
import axios from "axios"

const handleApiError = (err: unknown): ApiError => {
    if (axios.isAxiosError(err)) {
        return err.response?.data as ApiError
    }
    return { error: "unexpected error" }
}

export const loginUser = (payload: LoginPayload) =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .post<ApiResponse<{ message: string }>>("/auth/login", payload)
                .then((res) => res.data),
        catch: handleApiError,
    })

export const forgotPassword = (payload: ForgotPasswordPayload) =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .post<ApiResponse<{ message: string }>>("/auth/forgot-password", payload)
                .then((res) => res.data),
        catch: handleApiError,
    })

export const logout = () =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .post<void>("/auth/logout")
                .then((res) => res.data),
        catch: handleApiError,
    })

export const resetPassword = (payload: ResetPasswordPayload) =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .post<ApiResponse<{ message: string }>>("/auth/reset-password", payload)
                .then((res) => res.data),
        catch: handleApiError,
    })

export const createUser = (payload: CreateUserPayload) =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .post<ApiResponse<{ message: string }>>("/auth/users", payload)
                .then((res) => res.data),
        catch: handleApiError,
    })

export const getUsers = (params: GetUsersParams) =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .get<ApiResponse<User[]>>("/users", { params })
                .then((res) => res.data),
        catch: handleApiError,
    })


export const getUserByEmail = (params: GetUserByEmail) =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .get<ApiResponse<User>>("/users/email", { params })
                .then((res) => res.data),
        catch: handleApiError,
    })


export const getCurrentUser = () =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .get<ApiResponse<CurrentUser>>("/users/me")
                .then((res) => res.data),
        catch: handleApiError,
    })


export const getUserByID = (id: string) =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .get<ApiResponse<User>>(`/users/${id}`)
                .then((res) => res.data),
        catch: handleApiError,
    })


export const updateUser = (id: string, payload: UpdateUserPayload) =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .put<ApiResponse<User>>(`/users/${id}`, payload) // payload goes here
                .then((res) => res.data),
        catch: handleApiError,
    })


export const deleteUser = (id: string) =>
    Effect.tryPromise({
        try: () =>
            apiClient
                .delete<ApiResponse<void>>(`/users/${id}`)
                .then((res) => res.data),
        catch: handleApiError,
    })
