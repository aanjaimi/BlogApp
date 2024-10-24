import { configureStore } from '@reduxjs/toolkit'
import { blogReducer } from './blogs/slice'

export const store = configureStore({
    reducer: {
        blogReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch