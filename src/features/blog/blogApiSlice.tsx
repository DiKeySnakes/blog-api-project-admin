import { apiSlice } from "../../app/api/apiSlice"

export interface IBlog {
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

export interface IUser {
  _id: string
  username: string
  email: string
  password: string
  roles: [string]
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IComment {
  _id: string
  content: string
  blog: string
  user: IUser
  createdAt: Date
  updatedAt: Date
}

export type BlogsResponse = IBlog[]
export type DetailedBlogResponse = {
  blog: IBlog
  comments: IComment[]
}

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getALLBlogs: builder.query<BlogsResponse, void>({
      query: () => ({
        url: "/blog/blogs",
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
    addNewBlog: builder.mutation({
      query: (initialBlog) => ({
        url: "/blog/create_blog",
        method: "POST",
        body: {
          ...initialBlog,
        },
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),
    updateBlog: builder.mutation({
      query: (initialBlog) => ({
        url: `/blog/update/${initialBlog._id}`,
        method: "PATCH",
        body: {
          ...initialBlog,
        },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    publishBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/publish/${id}`,
        method: "PATCH",
        body: { id },
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),
  }),
})

export const {
  useGetALLBlogsQuery,
  useGetDetailedBlogQuery,
  useAddNewBlogMutation,
  useUpdateBlogMutation,
  usePublishBlogMutation,
} = blogApiSlice
