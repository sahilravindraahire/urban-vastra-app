import {createSlice} from "@reduxjs/toolkit"
import {placeOrder, fetchMyOrders, fetchAllOrders, updateOrderStatus} from "../thunk/orderThunk.js"

const initialState = {
    orders: [],
    myOrders: [],
    loading: false,
    error: null,
    createdOrder: null
}

const orderSilce = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearOrderError: (state) => {
            state.error = null
        },
        clearCreatedOrder: (state) => {
            state.createdOrder = null
        }
    },
    extraReducers: (builder) => {
        // place order
        builder.addCase(placeOrder.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.loading = false
            state.createdOrder = action.payload
            state.myOrders.unshift(action.payload)
        })
        builder.addCase(placeOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // fetch my orders
        builder.addCase(fetchMyOrders.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
            state.loading = false
            state.myOrders = action.payload
        })
        builder.addCase(fetchMyOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // fetch all orders 
        builder.addCase(fetchAllOrders.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
        })
        builder.addCase(fetchAllOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // update order status
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.loading = false
            const idx = state.orders.findIndex((ord) => ord._id === action.payload._id) 
            if(idx !== -1) state.orders[idx] = action.payload
        })
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {clearCreatedOrder, clearOrderError} = orderSilce.actions

export default orderSilce.reducer