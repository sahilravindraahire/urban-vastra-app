import {useEffect} from 'react'
import {useDispatch} from "react-redux"
import toast from "react-hot-toast"
import {fetchAllOrders, updateOrderStatus} from "../../store/thunk/orderThunk.js"
import {useOrders} from "../../hooks/index.js"
import {Loader, Badge} from "../../components/common/index.jsx"

function AdminOrders() {

    const dispatch = useDispatch()
    const {orders, loading} = useOrders()

    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [dispatch])

    const handleStatus = async (id, status) => {
        const result = await dispatch(updateOrderStatus({id, status}))
        if(updateOrderStatus.fulfilled.match(result)) toast.success("Order status updated")
            else toast.error("Failed to update status")
    }

    if(loading) return <Loader fullScreen/>

  return (
    <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-1">Admin</p>
          <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide">All Orders</h1>
          <p className="text-gray-500 text-xs mt-1 tracking-wider">{orders.length} orders total</p>
        </div>
 
        <div className="space-y-3">
          {orders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xs tracking-[0.3em] uppercase">No orders yet</p>
            </div>
          ) : (
            [...orders].reverse().map((order) => (
              <div key={order._id} className="bg-[#0f0d0a] border border-[#c9a96e]/10 p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div>
                      <p className="text-[10px] text-gray-500 tracking-wider mb-1">Order ID</p>
                      <p className="text-white text-xs font-mono">{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="hidden sm:block h-8 w-px bg-[#c9a96e]/10" />
                    <div>
                      <p className="text-[10px] text-gray-500 tracking-wider mb-1">Customer</p>
                      <p className="text-white text-xs">{order.userId?.name || "—"}</p>
                    </div>
                    <div className="hidden sm:block h-8 w-px bg-[#c9a96e]/10" />
                    <div>
                      <p className="text-[10px] text-gray-500 tracking-wider mb-1">Amount</p>
                      <p className="text-[#c9a96e] text-sm">₹{Number(order.totalAmount).toLocaleString("en-IN")}</p>
                    </div>
                    <div className="hidden sm:block h-8 w-px bg-[#c9a96e]/10" />
                    <div>
                      <p className="text-[10px] text-gray-500 tracking-wider mb-1">Date</p>
                      <p className="text-white text-xs">{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-4">
                    <Badge status={order.status} />
                    <select
                      value={order.status}
                      onChange={(e) => handleStatus(order._id, e.target.value)}
                      className="bg-[#0a0805] border border-[#c9a96e]/20 text-gray-400 text-[10px] tracking-widest uppercase px-3 py-2 focus:outline-none focus:border-[#c9a96e]/40 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
 
                {/* Items */}
                <div className="mt-4 pt-4 border-t border-[#c9a96e]/5 flex flex-wrap gap-3">
                  {order.items.map((item, i) => (
                    <span key={i} className="text-[10px] text-gray-600 tracking-wider">
                      Item #{i + 1} × {item.qty} — ₹{item.price?.toLocaleString("en-IN")}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
