import {createSlice} from "@reduxjs/toolkit"
import {fetchAdminStats} from "../thunk/analyticThunk.js"

const analyticSlice = createSlice({
    name: "analytics",
    initialState: {
        stats: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdminStats.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchAdminStats.fulfilled, (state, action) => {
            state.loading = false
            state.stats = action.payload
        })
        builder.addCase(fetchAdminStats.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default analyticSlice.reducer