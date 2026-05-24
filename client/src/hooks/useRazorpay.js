import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  loadRazorpayScript,
} from "../store/thunk/paymentThunk.js";
import { useAuth } from "./index.js";

const useRazorpay = () => {
  const { user } = useAuth();

  const initialPayment = useCallback(
    async ({ amount, onSuccess, onFailure }) => {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        toast.error("Failed to load payment gateway");
        return;
      }

      try {
        const order = await createRazorpayOrder(amount);

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "UrabnVastra",
          description: "Fashion that speaks",
          order_id: order._id,
          handler: async (response) => {
            try {
              await verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              toast.success("Payment verified!");
              onSuccess && onSuccess(response.razorpay_payment_id);
            } catch {
              toast.error("Payment verification failed");
              onFailure && onFailure();
            }
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
          },
          theme: { color: "#c9a96e" },
          modal: {
            ondismiss: () => toast.apply("Payment cancelled", { icon: "⚠️" }),
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        toast.error("Could not initiate payment");
        onFailure && onFailure();
      }
    }, [user]);
    return {initialPayment}
};

export default useRazorpay
