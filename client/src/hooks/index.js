import {useDispatch, useSelector} from "react-redux"
import {useCallback} from "react"
import {addToCart, removeFromCart, updateQty, setAddress, clearCart} from "../store/slices/cartSlice.js"

export const useAuth = () => {
    const {user, token, loading, error, otpSent, otpEmail, users} = useSelector((s) => s.auth)

    return {user, token, loading, error, otpSent, otpEmail, users, isAdmin: user?.role === "admin"}
}

export const useCart = () => {
    const dispatch = useDispatch()
    const {items, address} = useSelector((s) => s.cart)

    // The JavaScript .reduce() method is a powerful Array tool that executes a "reducer" callback function on each element of an array, resulting in a single output value. It effectively "reduces" an entire array into one final result, such as a number, string, or object. Accumulator (acc)
    const totalItems = items.reduce((acc, i) => acc + i.qty, 0) 
    // Calculates total quantity
    /*
    items = [
  {name: "Shirt", qty: 2},
  {name: "Shoes", qty: 1}
  ]
    */
    const totalPrice = items.reduce((acc, i) => acc + i.price * i.qty, 0)
    // logic same as above
    return {
        items,
        address,
        totalItems,
        totalPrice,
        // With useCallback: React stores the function and reuses the same function reference unless dependencies change.
        addItem: useCallback((product) => dispatch(addToCart(product)), [dispatch]),
        removeItem: useCallback((id) => dispatch(removeFromCart(id)), [dispatch]),
        changeQty: useCallback((id, qty) => dispatch(updateQty({id, qty})), [dispatch]),
        emptyCart: useCallback(() => dispatch(clearCart()), [dispatch]),
        saveAddress: useCallback((addr) => dispatch(setAddress(addr)), [dispatch])
    }
}

export const useProducts = () => {
    const {products, product, loading, error} = useSelector((s) => s.product)
    return {product, products, loading, error}
}

export const useOrders = () => {
    const {orders, myOrders, loading, error, createOrder} = useSelector((s) => s.order)
    return {orders, myOrders, loading, error, createOrder}
}

export const useAnalytics = () => {
    const {stats, loading, error} = useSelector((s) => s.analytics)
    return {stats, loading, error}
}