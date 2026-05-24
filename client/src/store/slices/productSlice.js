import {createSlice} from "@reduxjs/toolkit"
import {fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct} from "../thunk/productThunk.js"

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearProductError: (state) => {
            state.error = null
        },
        clearProduct: (state) => {
            state.product = null
        }
    },
    extraReducers: (builder) => {
        // fetch all products
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // fetch single product
        builder.addCase(fetchProductById.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false
            state.product = action.payload
        })
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // create product
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // update product
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false
            const idx = state.products.findIndex((prod) => prod._id === action.payload._id)
            if(idx !== -1) state.products[idx] = action.payload
            state.product = action.payload
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // delete product
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = state.products.filter((prod) => prod._id !== action.payload) 
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {clearProduct, clearProductError} = productSlice.actions

export default productSlice.reducer