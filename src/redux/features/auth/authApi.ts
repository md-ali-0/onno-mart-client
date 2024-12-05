import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        SignUpUser: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/signup",
                    body: data,
                    method: "POST",
                };
            },
        }),
        signoutUser: builder.mutation({
            query: () => {
                return {
                    url: "/auth/signout",
                    method: "POST",
                };
            },
        }),
        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/forget-password",
                    body: data,
                    method: "POST",
                };
            },
        }),
        resetPassword: builder.mutation({
            query: ({ id, newPassword, token }) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: { id, newPassword },
                headers: {
                    Authorization: token,
                },
            }),
        }),
    }),
});

export const {
    useSignUpUserMutation,
    useSignoutUserMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
} = authApi;
