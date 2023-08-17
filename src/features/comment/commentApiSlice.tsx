import { apiSlice } from "../../app/api/apiSlice"

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewComment: builder.mutation({
      query: (initialCommentData) => ({
        url: `/comment/create/${initialCommentData.blog}`,
        method: "POST",
        body: {
          ...initialCommentData,
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    deleteComment: builder.mutation({
      query: ({ id }) => ({
        url: `/comment/delete/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
  }),
})

export const { useAddNewCommentMutation, useDeleteCommentMutation } =
  commentApiSlice
