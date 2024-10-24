import { createSlice } from '@reduxjs/toolkit'
import { Blog } from '@/types/blog'
import { fetchBlogs } from '../createAsyncThunk'

// Define a type for the slice state
export interface BlogState {
    blogs: Blog[] | undefined
}

// Define the initial state using that type
const initialState: BlogState = {
    blogs: undefined
}

export const blogSlice = createSlice({
    name: 'blogList',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload
        })
    },
})

export const { setBlogs } = blogSlice.actions

export default blogSlice.reducer
export const blogReducer = blogSlice.reducer