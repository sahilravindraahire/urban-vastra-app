import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart, useAuth } from "../../hooks/index.js";
import { placeOrder } from "../../store/thunk/orderThunk.js";
import useRazorpay from "../../hooks/useRazorpay.js";
import { GoldButton, InputField } from "../../components/common/index.jsx";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice, address, saveAddress, emptyCart } = useCart();
  const { user } = useAuth();
  const { initialPayment } = useRazorpay();

  const [addr, setAddr] = useState(
    address || {
      fullName: user?.name || "",
      street: "",
      city: "",
      postalCode: "",
      country: "India",
    },
  );

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  useEffect(() => {
    setAddr(address || {
      fullName: user?.name || "",
      street: "",
      city: "",
      postalCode: "",
      country: "India"
    })
  }, [user])

  const shipping = totalPrice >= 999 ? 0 : 99;
  const total = totalPrice + shipping;

  const handleAddrChange = (e) =>
    setAddr((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    saveAddress(addr);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleCOD = async () => {
    setLoading(true)
    try {
        const orderData = {
            items: items.map((i) => ({ productId: i._id, qty: i.qty, price: i.price })),
            totalAmount: total,
            address: addr,
            paymentId: "COD",
        }
        console.log("Placing COD order:", orderData)  
        const result = await dispatch(placeOrder(orderData))
        console.log("Order result:", result)         
        if (placeOrder.fulfilled.match(result)) {
            emptyCart()
            toast.success("Order placed! Pay on delivery.")
            navigate("/orders")
        } else {
            toast.error(result.payload || "Failed to place order")
        }
    } catch(err) {
        console.error("COD error:", err)
        toast.error("Something went wrong")
    } finally {
        setLoading(false)   // ← always runs, even on error
    }
}

    const result = await dispatch(placeOrder(orderData));
    if (placeOrder.fulfilled.match(result)) {
      emptyCart();
      toast.success("Order placed! Pay on delivery.");
      navigate("/orders");
    } else {
      toast.error("failed to place order");
    }
    setLoading(false);
  };

  const handleOnlinePayment = async () => {
    setLoading(true);
    await initialPayment({
      amount: total,
      onSuccess: async (paymentId) => {
        const orderData = {
          items: items.map((i) => ({
            productId: i._id,
            qty: i.qty,
            price: i.price,
          })),
          totalAmount: total,
          address: addr,
          paymentId,
        };
        const result = await dispatch(placeOrder(orderData));
        if (placeOrder.fulfilled.match(result)) {
          emptyCart();
          toast.success("Order placed successfully!");
          navigate("/orders");
        }
        setLoading(false);
      },
      onFailure: () => setLoading(false),
    });
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-1">
            Complete Your Order
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide">
            Checkout
          </h1>

          {/* Steps */}
          <div className="flex items-center gap-4 mt-6">
            {["Shipping Address", "Payment"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 flex items-center justify-center text-[10px] border transition-colors ${
                    step > i + 1
                      ? "bg-[#c9a96e] border-[#c9a96e] text-[#0a0805]"
                      : step === i + 1
                        ? "border-[#c9a96e] text-[#c9a96e]"
                        : "border-gray-700 text-gray-600"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-[10px] tracking-widest uppercase hidden sm:block ${step === i + 1 ? "text-[#c9a96e]" : "text-gray-600"}`}
                >
                  {label}
                </span>
                {i === 0 && <div className="h-px w-8 bg-[#c9a96e]/20" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {step === 1 ? (
              <form
                onSubmit={handleAddressSubmit}
                className="space-y-4 bg-[#0f0d0a] border border-[#c9a96e]/10 p-6"
              >
                <h2 className="text-white text-sm tracking-widest uppercase mb-6">
                  Shipping Details
                </h2>
                {[
                  { label: "Full Name", name: "fullName" },
                  { label: "Street Address", name: "street" },
                  { label: "City", name: "city" },
                  { label: "Postal Code", name: "postalCode" },
                  { label: "Country", name: "country" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={addr[field.name]}
                      onChange={handleAddrChange}
                      required
                      className="bg-transparent border border-[#c9a96e]/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e]/60"
                    />
                  </div>
                ))}
                <div className="pt-4">
                  <GoldButton type="submit">Continue to Payment</GoldButton>
                </div>
              </form>
            ) : (
              <div className="bg-[#0f0d0a] border border-[#c9a96e]/10 p-6">
                <h2 className="text-white text-sm tracking-widest uppercase mb-6">
                  Select Payment Method
                </h2>

                {/* Address summary */}
                <div className="mb-6 p-4 border border-[#c9a96e]/10">
                  <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-3">
                    Delivering to
                  </p>
                  <p className="text-white text-sm">{addr.fullName}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {addr.street}, {addr.city}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {addr.postalCode}, {addr.country}
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="text-[#c9a96e] text-[10px] tracking-widest uppercase mt-3 hover:text-white transition-colors"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-16 object-cover border border-[#c9a96e]/10"
                      />
                      <div className="flex-1">
                        <p className="text-white text-xs">{item.name}</p>
                        <p className="text-gray-500 text-[10px]">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <p className="text-[#c9a96e] text-xs">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Payment method selector */}
                <div className="space-y-3 mb-6">
                  {/* Online Payment */}
                  <div
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
                      paymentMethod === "razorpay"
                        ? "border-[#c9a96e] bg-[#c9a96e]/5"
                        : "border-[#c9a96e]/10 hover:border-[#c9a96e]/30"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        paymentMethod === "razorpay"
                          ? "border-[#c9a96e]"
                          : "border-gray-600"
                      }`}
                    >
                      {paymentMethod === "razorpay" && (
                        <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-xs tracking-wider">
                        Online Payment
                      </p>
                      <p className="text-gray-500 text-[10px] tracking-wider mt-0.5">
                        UPI, Cards, Net Banking via Razorpay
                      </p>
                    </div>
                  </div>

                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#c9a96e] bg-[#c9a96e]/5"
                        : "border-[#c9a96e]/10 hover:border-[#c9a96e]/30"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        paymentMethod === "cod"
                          ? "border-[#c9a96e]"
                          : "border-gray-600"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-xs tracking-wider">
                        Cash on Delivery
                      </p>
                      <p className="text-gray-500 text-[10px] tracking-wider mt-0.5">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                {paymentMethod === "cod" ? (
                  <GoldButton onClick={handleCOD} disabled={loading}>
                    {loading
                      ? "Placing Order..."
                      : `Place Order — ₹${total.toLocaleString("en-IN")} (COD)`}
                  </GoldButton>
                ) : (
                  <GoldButton onClick={handleOnlinePayment} disabled={loading}>
                    {loading
                      ? "Processing..."
                      : `Pay ₹${total.toLocaleString("en-IN")} via Razorpay`}
                  </GoldButton>
                )}
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f0d0a] border border-[#c9a96e]/10 p-6 sticky top-24">
              <h2 className="text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase mb-5">
                Order Total
              </h2>
              <div className="space-y-3 text-xs tracking-wider mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-white">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span
                    className={shipping === 0 ? "text-green-400" : "text-white"}
                  >
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
              </div>
              <div className="border-t border-[#c9a96e]/10 pt-4">
                <div className="flex justify-between">
                  <span className="text-white text-sm">Total</span>
                  <span className="text-[#c9a96e] text-lg font-light">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              {paymentMethod === "cod" && (
                <div className="mt-4 p-3 border border-yellow-500/20 bg-yellow-500/5">
                  <p className="text-yellow-400 text-[10px] tracking-wider text-center uppercase">
                    Cash on Delivery Selected
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
