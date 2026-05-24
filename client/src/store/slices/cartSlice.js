import { createSlice } from "@reduxjs/toolkit";

const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user?._id ? `cart${user._id}` : "cart_guest"
}

const getAddressKey = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user?._id ? `address_${user._id}` : "address_guest"
}

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(getCartKey())) || [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem(getCartKey(), JSON.stringify(items));
};


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCart(),
        address: JSON.parse(localStorage.getItem(getAddressKey())) || null
    },
    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find((itm) => itm._id === action.payload._id)
            if(existing){
                existing.qty += 1
            }else{
                state.items.push({...action.payload, qty: 1})
            }
            saveCart(state.items)
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((itm) => itm._id !== action.payload)
            saveCart(state.items)
        },
        updateQty: (state, action) => {
            const item = state.items.find((itm) => itm._id === action.payload.id)
            if(item){
                item.qty = action.payload.qty
                // Remove if qty <= 0
                if(item.qty <= 0) state.items = state.items.filter((itm) => itm._id !== action.payload.id)
            }
        saveCart(state.items)
        },
        loadUserCart: (state) => {
            state.items = loadCart()
        },
        clearCart: (state) => {
            state.items = []
            saveCart([])
        },
        setAddress: (state, action) => {
            state.address = action.payload
            localStorage.setItem(getAddressKey(), JSON.stringify(action.payload))
        },
        loadUserAddress: (state) => {
            state.address = JSON.parse(localStorage.getItem(getAddressKey())) || null
        }
    }
})

export const {addToCart, removeFromCart, updateQty, loadUserCart, clearCart, setAddress, loadUserAddress} = cartSlice.actions
export default cartSlice.reducer