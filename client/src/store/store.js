import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice.js"
import productReducer from "./slices/productSlice.js"
import orderReducer from "./slices/orderSlice.js"
import cartReducer from "./slices/cartSlice.js"
import analyticsReducer from "./slices/analyticsSlice.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        order: orderReducer,
        cart: cartReducer,
        analytics: analyticsReducer
    }
})