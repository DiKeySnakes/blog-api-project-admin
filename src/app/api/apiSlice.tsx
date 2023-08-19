import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react"
import { setCredentials } from "../../features/auth/authSlice"
import { RootState } from "../store"
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes"

const baseQuery = fetchBaseQuery({
  baseUrl: "https://blog-api-project-server.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions)

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token")

    // send refresh token to get new access token
    const refreshResult: QueryReturnValue<
      unknown,
      FetchBaseQueryError,
      FetchBaseQueryMeta
    > = await baseQuery("/auth/refresh", api, extraOptions)

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }))

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        if (refreshResult.error.data instanceof Error) {
          refreshResult.error.data.message = "Your login has expired."
        }
      }
      return refreshResult
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Blog", "Comment", "User"],
  endpoints: (builder) => ({}),
})
