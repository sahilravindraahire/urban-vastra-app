import {createAsyncThunk} from "@reduxjs/toolkit"
import API from "../../api/axios.js"

export const placeOrder = createAsyncThunk(
    "order/place",
    async(orderData, {rejectWithValue}) => {
        try {
            const {data} = await API.post("/orders", orderData)
            return data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to place order")
        }
    }
)

export const fetchMyOrders = createAsyncThunk(
    "order/myOrders",
    async(_, {rejectWithValue}) => {
        try {
            const {data} = await API.get("/orders/my-orders")
            return data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to fetch orders")
        }
    }
)

export const fetchAllOrders = createAsyncThunk(
    "order/allOrders",
    async(_, {rejectWithValue}) => {
        try {
            const {data} = await API.get("/orders")
            return data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to fetch orders")
        }
    }
)

export const updateOrderStatus = createAsyncThunk(
    "order/updateStatus",
    async({id, status}, {rejectWithValue}) => {
        try {
            const {data} = await API.put(`/orders/${id}/status`, {status})
            return data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "failed to update status")
        }
    }
)