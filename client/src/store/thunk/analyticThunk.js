import {createAsyncThunk} from "@reduxjs/toolkit"
import API from "../../api/axios.js"

export const fetchAdminStats = createAsyncThunk(
    "analytics/stats",
    async(_, {rejectWithValue}) => {
        try {
            const {data} = await API.get("/analytics")
            return data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to fetch stats")
        }
    }
)