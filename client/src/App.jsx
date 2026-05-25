import {Routes, Route} from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/common/Navbar.jsx"
import Footer from "./components/common/Footer.jsx"
import {ProtectedRoute, AdminRoute} from "./components/common/index.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/auth/Login.jsx"
import Register from "./pages/auth/Register.jsx"
import Products from "./pages/user/Products.jsx"
import ProductDetail from "./pages/user/Productdetail.jsx"
import Cart from "./pages/user/Cart.jsx"
import Checkout from "./pages/user/Checkout.jsx"
import Orders from "./pages/user/Orders.jsx"
import AdminDashboard from "./pages/admin/AdminDasboard.jsx"
import AdminProducts from "./pages/admin/AdminProducts.jsx"
import AdminOrders from "./pages/admin/AdminOrders.jsx"
import AdminUsers from "./pages/admin/AdminUsers.jsx"


function App() {
  return (
    <div className="min-h-screen bg-[#0a0805] flex flex-col">
      <Navbar/>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:id" element={<ProductDetail/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
          <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
          <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
          <Route path="/admin/products" element={<AdminRoute><AdminProducts/></AdminRoute>}/>
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders/></AdminRoute>}/>
          <Route path="/admin/users" element={<AdminRoute><AdminUsers/></AdminRoute>}/>
          <Route path="*" element={
            <div className="min-h-screen bg-[#0a0805] flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#c9a96e] text-6xl font-light mb-4">404</p>
                <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mb-8">Page not found</p>
                <a href="/" className="text-[#c9a96e] text-[10px] tracking-widest uppercase hover:text-white transition-colors">← Return Home</a>
              </div>
            </div>
          }/>
        </Routes>
      </main>
      <Footer/>
      <Toaster 
      position="top-right"
      toastOptions={{
        style: {
          background: "#0f0d0a",
          color: "#fff",
          border: "1px solid rgba(201, 169, 110, 0.15)",
          borderRadius: "0",
          fontSize: "11px",
          letterSpacing: "0.05em"
        },
        success: {iconTheme: {primary: "#c9a96e", secondary: "#0a0805"}},
        error: {iconTheme: {primary: "#ef4444", secondary: "#0a0805"}}
      }}
      />
    </div>
  )
}

export default App
