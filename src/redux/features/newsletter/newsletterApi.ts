import { TQueryParam, TResponseRedux } from "@/types";
import { Newsletter } from "@/types/Newsletter";
import { baseApi } from "../../api/baseApi";

const newsletterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleNewsletter: builder.query({
            query: (id) => {
                return {
                    url: `/newsletter/${id}`,
                };
            },
            providesTags: ["newsletters"],
        }),
        getAllNewsletters: builder.query({
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
                    url: `/newsletter`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<Newsletter[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["newsletters"],
        }),
        createNewsletter: builder.mutation({
            query: (data) => {
                return {
                    url: "/newsletter",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["newsletters"],
        }),
        updateNewsletter: builder.mutation({
            query: (data) => {
                return {
                    url: `/newsletter/${data.id}`,
                    method: "PATCH",
                    body: data.formData,
                };
            },
            invalidatesTags: ["newsletters"],
        }),
        deleteNewsletter: builder.mutation({
            query: (id) => {
                return {
                    url: `/newsletter/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["newsletters"],
        }),
    }),
});

export const {
    useGetAllNewslettersQuery,
    useGetSingleNewsletterQuery,
    useCreateNewsletterMutation,
    useDeleteNewsletterMutation,
    useUpdateNewsletterMutation,
} = newsletterApi;
