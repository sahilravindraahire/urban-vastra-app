import crypto from "crypto"
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import Razorpay from "razorpay";


export const createOrder = asyncHandler(async(req, res) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    const options = {
        amount: req.body.amount * 100,
        currency: "INR"
    }

    const order = await instance.orders.create(options)

    if(!order){
        throw new apiError(500, "error while creating razorpay order")
    }

    return res
    .status(200)
    .json(new apiResponse(200, order, "order created successfully"))
})

export const verifyPayment = asyncHandler(async(req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
        throw new apiError(400, "payment details are missing")
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSign = crypto
    .createHmac("sha", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex")

    if(razorpay_signature !== expectedSign){
        throw new apiError(400, "invalid payment signature")
    }

    return res
    .status(200)
    .json(new apiResponse(200, "payment verified successfully"))
})