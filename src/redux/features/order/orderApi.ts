import { Order, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleOrder: builder.query({
            query: (id) => {
                return {
                    url: `/order/${id}`,
                };
            },
            providesTags: ["orders"],
        }),
        getAllOrders: builder.query({
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
                    url: `/order`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<Order[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["orders"],
        }),
        updateOrder: builder.mutation({
            query: (data) => {
                return {
                    url: `/order/${data.id}`,
                    method: "PATCH",
                    body: data.formData,
                };
            },
            invalidatesTags: ["orders"],
        }),
        deleteOrder: builder.mutation({
            query: (id) => {
                return {
                    url: `/order/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["orders"],
        }),
    }),
});

export const {
    useGetAllOrdersQuery,
    useGetSingleOrderQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = ordersApi;
