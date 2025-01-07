import { TQueryParam, TResponseRedux } from "@/types";

import { Coupon } from "@/types/Coupon";
import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleCoupon: builder.mutation({
            query: (code) => {
                return {
                    url: `/coupon/${code.code}`,
                };
            },
        }),
        getAllCoupons: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        if (item.value !== undefined) {
                            params.append(item.name, item.value as string);
                        }
                    });
                }
                return {
                    url: `/coupon`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<Coupon[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["coupons"],
        }),
        createCoupon: builder.mutation({
            query: (data) => {
                return {
                    url: "/coupon",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["coupons"],
        }),
        updateCoupon: builder.mutation({
            query: (data) => {
                return {
                    url: `/coupon/${data.id}`,
                    method: "PATCH",
                    body: data.formData,
                };
            },
            invalidatesTags: ["coupons"],
        }),
        deleteCoupon: builder.mutation({
            query: (id) => {
                return {
                    url: `/coupon/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["coupons"],
        }),
    }),
});

export const {
    useGetAllCouponsQuery,
    useGetSingleCouponMutation,
    useCreateCouponMutation,
    useDeleteCouponMutation,
    useUpdateCouponMutation
} = couponApi;
