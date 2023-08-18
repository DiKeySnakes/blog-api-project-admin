import { apiSlice } from "../../app/api/apiSlice"
import { IUser } from "../blog/blogApiSlice"

export type UsersResponse = IUser[]

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => ({
        url: "/user/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: "LIST" },
              ...result.map(({ _id }) => ({ type: "User" as const, _id })),
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/auth/sign_up",
        method: "POST",
        body: {
          ...initialUserData,
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUserActive: builder.mutation({
      query: (id) => ({
        url: `/user/active/${id}`,
        method: "PATCH",
        body: {
          ...id,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserActiveMutation,
} = userApiSlice
