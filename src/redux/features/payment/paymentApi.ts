import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation({
            query: (data) => {
                return {
                    url: `/payment/create-payment/${data?.paymentMethod}`,
                    method: "POST",
                    body: data?.orderData,
                };
            },
            invalidatesTags: ["orders"],
        }),
    }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
