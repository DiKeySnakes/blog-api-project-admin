import { apiSlice } from "../../app/api/apiSlice"

// interface IUser {
//   _id: string
//   username: string
//   email: string
//   password: string
//   roles: [string]
//   active: boolean
//   createdAt: Date
//   updatedAt: Date
// }

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
})

export const { useAddNewUserMutation } = userApiSlice
