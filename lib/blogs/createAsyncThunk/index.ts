import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBlogs, getBlog, addBlogAction, updateBlogAction, removeBlogAction, removeAllBlogs } from '@/actions/blogs'
import { Blog } from '@/types/blog'
import { BlogSchema } from '@/schemas'
import * as z from 'zod'
import { toast } from 'sonner'

// ** Fetch Blogs
export const fetchBlogs = createAsyncThunk(
    'blogList/fetchBlogs',
    async () => {
        try {
            const blogs = await getBlogs()

            return blogs.map(blog => ({
                ...blog,
                createdAt: new Date(blog.createdAt).toISOString(),
            }))

        } catch (err) {
            console.log(err)

            return []
        }
    },
)

// ** Get Blog
export const fetchBlog = createAsyncThunk(
    'blogList/fetchBlog',
    async (id: string) => {
        const blog = await getBlog(id)

        return blog
    },
)

// ** Add Blog
export const addBlog = createAsyncThunk(
    'blogList/addBlog',
    async (blog: z.infer<typeof BlogSchema>, { dispatch }) => {
        const addedBlog = await addBlogAction(blog)

        const { error } = addedBlog
        if (error) {
            toast.error(error)
            return error
        }

        await dispatch(fetchBlogs())

        toast.success('Blog Added Successfully')

        return addedBlog
    },
)

// ** Update Blog
export const updateBlog = createAsyncThunk(
    'blogList/updateBlog',
    async ({ blog, blogId } : {blog: z.infer<typeof BlogSchema>, blogId: string}, { dispatch }) => {
        const updatedBlog = await updateBlogAction(blogId, blog)

        const { error } = updatedBlog
        if (error) {
            toast.error(error)
            return error
        }

        await dispatch(fetchBlogs())

        toast.success('Blog Updated Successfully')

        return updatedBlog
    },
)

// ** Delete Blog
export const deleteBlog = createAsyncThunk(
    'blogList/deleteBlog',
    async (blog: Blog, { dispatch }) => {
        const deletedBlog = await removeBlogAction(blog.id)

        const { error } = deletedBlog
        if (error) {
            toast.error(error)
            return error
        }

        await dispatch(fetchBlogs())

        toast.success('Blog Deleted Successfully')

        return deletedBlog
    },
)

// ** Delete All Blogs
export const deleteAllBlogs = createAsyncThunk(
    'blogList/deleteAllBlogs',
    async (userId: string, { dispatch }) => {
        const deletedBlogs = await removeAllBlogs()

        const { error } = deletedBlogs
        if (error) {
            toast.error(error)
            return error
        }

        await dispatch(fetchBlogs())

        toast.success('All Blogs Deleted Successfully')

        return []
    },
)