import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation({
            query: (data) => {
                return {
                    url: "/payment/create-payment",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["orders"],
        }),
    }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
