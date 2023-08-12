import { apiSlice } from "../../app/api/apiSlice"

interface IBlog {
  _id: string
  image: string
  title: string
  description: string
  content: string
  comments: [string]
  published: boolean
  createdAt: Date
  updatedAt: Date
}

interface IUser {
  username: string
  email: string
  password: string
  roles: [string]
  active: boolean
}

interface IComment {
  _id: string
  content: string
  blog: string
  user: IUser
  createdAt: Date
  updatedAt: Date
}

type BlogsResponse = IBlog[]
type DetailedBlogResponse = {
  blog: IBlog
  comments: IComment[]
}

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getALLBlogs: builder.query<BlogsResponse, void>({
      query: () => ({
        url: "/blog/blogs_all",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),

      providesTags: (result) =>
        result
          ? [
              { type: "Blog", id: "LIST" },
              ...result.map(({ _id }) => ({ type: "Blog" as const, _id })),
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),

    getDetailedBlog: builder.query<DetailedBlogResponse, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),

      providesTags: (result) =>
        result
          ? [
              { type: "Comment", id: "LIST" },
              ...result.comments.map(({ _id }) => ({
                type: "Comment" as const,
                _id,
              })),
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
  }),
})

export const { useGetALLBlogsQuery, useGetDetailedBlogQuery } = blogApiSlice
