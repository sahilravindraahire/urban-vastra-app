import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import { fetchMyOrders } from "../../store/thunk/orderThunk.js";
import { useOrders } from "../../hooks/index.js";
import { Loader, Badge } from "../../components/common/index.jsx";

function Orders() {
  const dispatch = useDispatch();
  const { myOrders, loading } = useOrders();

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-1">
            Account
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide">
            My Orders
          </h1>
        </div>

        {myOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={40} className="text-[#c9a96e]/20 mx-auto mb-6" />
            <h2 className="text-white text-xl font-light tracking-wide mb-3">
              No orders yet
            </h2>
            <p className="text-gray-500 text-xs tracking-wider mb-8">
              Your order history will appear here
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#0a0805] px-8 py-3 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[#d4b87a] transition-colors"
            >
              Start Shopping <ArrowRight size={12} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {[...myOrders].reverse().map((order) => (
              <div
                key={order._id}
                className="bg-[#0f0d0a] border border-[#c9a96e]/10 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-1">
                      Order ID
                    </p>
                    <p className="text-white text-xs font-mono">{order._id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge status={order.status} />
                    {/* order COD */}
                    {order.paymentId === "COD" && (
                      <span className="text-[10px] tracking-widest uppercase px-3 py-1 border border-yellow-500/20 text-yellow-400">
                        COD
                      </span>
                    )}
                    <p className="text-[#c9a96e] font-light">
                      ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#c9a96e]/10 pt-4">
                  <div className="flex flex-wrap gap-3">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-gray-400"
                      >
                        <span className="text-[#c9a96e]/50">—</span>
                        <span>Item × {item.qty}</span>
                        <span className="text-gray-600">
                          ₹{item.price?.toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-2">
                    <p className="text-gray-600 text-[10px] tracking-wider">
                      {order.address?.city}, {order.address?.country}
                    </p>
                    <p className="text-gray-600 text-[10px] tracking-wider">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
