import {Order} from "../models/Order.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { sendEmail } from "../utils/sendEmail.js";

export const addOrderItems = asyncHandler(async(req, res) => {
    const {items, totalAmount, address, paymentId} = req.body

    if(items && items.length === 0){
        throw new apiError(400, "no order items")
    }

    const order = await Order.create({
        userId: req.user._id,
        items,
        totalAmount,
        address,
        paymentId
    })

    const createdOrder = await order.save()

    const message = `
    <h2>Order Confirmation</h2>
    <p>Hello ${req.user.name}</p>
    <p>Your order has been successfully placed! Order ID: <strong>${createdOrder._id}</strong></p>
    <p>Total Amount Paid: ₹${totalAmount.toFixed(2)}</p>
    <p>It will be shipped to: ${address.street}, ${address.city}</p>
    <p>Thank you for shopping with UrbanVastra</p>
    `

    await sendEmail({
        email: req.user.email,
        subject: "UrbanVastra - order confirmation",
        message
    })

    return res
    .status(201)
    .json(new apiResponse(201, createdOrder))
})

export const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({userId: req.user._id})

    if(!orders){
        throw new apiError(500, "error while fetching your orders")
    }

    return res
    .status(201)
    .json(new apiResponse(201, orders))
})

export const getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({})
    .populate("userId", "id name")

    if(!orders){
        throw new apiError(500, "error while fetching orders")
    }

    return res
    .status(201)
    .json(new apiResponse(201, orders))
})

export const updateOrderStatus = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        throw new apiError(404, "order not found")
    }

    order.status = req.body.status || order.status

    const updatedOrder = await order.save()

    return res
    .status(201)
    .json(new apiResponse(201, updatedOrder, "order status updated"))
})