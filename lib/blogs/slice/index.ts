import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Blog } from '@/types/blog'
import { fetchBlogs } from '../createAsyncThunk'

// Define a type for the slice state
export interface BlogState {
    blogs: Blog[] | undefined
}

export interface BlogAPI {
    id: string
    title: string
    content: string
    createdAt: string
    userId: string
}

// Define the initial state using that type
const initialState: BlogState = {
    blogs: undefined
}

export const blogSlice = createSlice({
    name: 'blogList',
    initialState,
    reducers: {
        setBlogs: (state, action: PayloadAction<Blog[]>) => {
            state.blogs = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<BlogAPI[]>) => {
            state.blogs = action.payload.map(blog => ({
                ...blog,
                createdAt: new Date(blog.createdAt),
            }))
        })
    },
})

export const { setBlogs } = blogSlice.actions

export default blogSlice.reducer
export const blogReducer = blogSlice.reducer