import { Shop, TResponseRedux, User } from "@/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => {
                return {
                    url: `/user/me`,
                };
            },
            transformResponse: (response: TResponseRedux<User>) => {
                return response.data;
            },
            providesTags: ["userData"],
        }),
        getAllUsers: builder.query({
            query: () => {
                return {
                    url: `/user`,
                };
            },
            transformResponse: (response: TResponseRedux<User[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },

            providesTags: ["users"],
        }),
        getAllFavoriteShops: builder.query({
            query: () => {
                return {
                    url: `/user/favorite-shop`,
                };
            },
            transformResponse: (response: TResponseRedux<Shop[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },

            providesTags: ["users"],
        }),
        updateUser: builder.mutation({
            query: (data) => {
                return {
                    url: `/user/${data.id}`,
                    method: "PATCH",
                    body: data.formData,
                };
            },
            invalidatesTags: ["users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/user?id=${id}`,
                    method: "DELETE",
                    params : {
                        id,
                    }
                };
            },
            invalidatesTags: ["users"],
        }),
        updateProfile: builder.mutation({
            query: (data) => {
                return {
                    url: `/user/me`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["userData"],
        }),
        followShop: builder.mutation({
            query: (shopId) => {
                return {
                    url: `/user/followShop/${shopId}`,
                    method: "POST",
                };
            },
            invalidatesTags: ["userData"],
        }),
        unfollowShop: builder.mutation({
            query: (shopId) => {
                return {
                    url: `/user/unfollowShop/${shopId}`,
                    method: "POST",
                };
            },
            invalidatesTags: ["userData"],
        }),
    }),
});

export const {
    useGetMeQuery,
    useGetAllUsersQuery,
    useGetAllFavoriteShopsQuery,
    useDeleteUserMutation,
    useUpdateProfileMutation,
    useUpdateUserMutation,
    useFollowShopMutation,
    useUnfollowShopMutation
} = userApi;
