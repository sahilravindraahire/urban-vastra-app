import API from "../../api/axios.js";

export const createRazorpayOrder = async (amount) => {
  const { data } = await API.post("/payment/order", { amount });
  return data.data;
};

export const verifyRazorpayPayment = async (paymentData) => {
  const { data } = await API.post("/payment/verify", paymentData);
  return data.data;
};

export const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
