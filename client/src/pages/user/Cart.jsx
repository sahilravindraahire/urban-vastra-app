import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../../hooks/index.js";
import { GoldButton } from "../../components/common/index.jsx";

function Cart() {
  const { items, totalPrice, removeItem, changeQty, emptyCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={40} className="text-[#c9a96e]/20 mx-auto mb-6" />
          <h2 className="text-white text-xl font-light tracking-wide mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-xs tracking-wider mb-8">
            Discover our collection and add your favourites
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#0a0805] px-8 py-3 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[#d4b87a] transition-colors"
          >
            Shop Now <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-1">
              Review
            </p>
            <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide">
              Your Cart
            </h1>
          </div>
          <button
            onClick={emptyCart}
            className="text-gray-500 hover:text-red-400 text-[10px] tracking-widest uppercase transition-colors"
          >
            Clear All
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 md:gap-6 p-4 bg-[#0f0d0a] border border-[#c9a96e]/10"
            >
              <Link to={`/products/${item._id}`} className="shrink-0">
                <img
                  src={
                    item.imageUrl ||
                    "https://placehold.co/80x106/0f0d0a/c9a96e?text=UV"
                  }
                  alt={item.name}
                  className="w-20 h-[106px] object-cover border border-[#c9a96e]/10"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-1">
                  {item.category}
                </p>
                <h3 className="text-white text-sm font-light tracking-wide truncate">
                  {item.name}
                </h3>
                <p className="text-[#c9a96e] text-sm mt-1">
                  ₹{item.price?.toLocaleString("en-IN")}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-[#c9a96e]/20">
                    <button
                      onClick={() => changeQty(item._id, item.qty - 1)}
                      className="px-3 py-2 text-gray-400 hover:text-white hover:bg-[#c9a96e]/10 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-4 text-white text-sm">{item.qty}</span>
                    <button
                      onClick={() => changeQty(item._id, item.qty + 1)}
                      className="px-3 py-2 text-gray-400 hover:text-white hover:bg-[#c9a96e]/10 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-gray-600 hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#0f0d0a] border border-[#c9a96e]/10 p-6 sticky top-24">
            <h2 className="text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs tracking-wider">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-white">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-xs tracking-wider">
                <span className="text-gray-500">Shipping</span>
                <span
                  className={
                    totalPrice >= 999 ? "text-green-400" : "text-white"
                  }
                >
                  {totalPrice >= 999
                    ? "Free"
                    : `₹${(99).toLocaleString("en-IN")}`}
                </span>
              </div>
              {totalPrice < 999 && (
                <p className="text-[10px] text-gray-600 tracking-wide">
                  Add ₹{(999 - totalPrice).toLocaleString("en-IN")} more for
                  free shipping
                </p>
              )}
            </div>
            <div className="border-t border-[#c9a96e]/10 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-white text-sm tracking-wider">Total</span>
                <span className="text-[#c9a96e] text-lg font-light">
                  ₹
                  {(totalPrice + (totalPrice >= 999 ? 0 : 99)).toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>
            </div>
            <Link to="/checkout">
              <GoldButton className="flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={12} />
              </GoldButton>
            </Link>
            <Link
              to="/products"
              className="block text-center mt-4 text-gray-500 hover:text-gray-300 text-[10px] tracking-widest uppercase transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
