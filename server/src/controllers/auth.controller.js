import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import { OTP } from "../models/OTP.model.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" ,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new apiError(400, "all fields are required")
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new apiError(409, "user already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(!user){
        throw new apiError(500, "error while registering user")
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await OTP.create({email, otp})

    const message = `
        <h2>Welcome to UrbanVastra!</h2>
        <p>Hello ${name},</p>
        <p>Your OTP for email verification is:</p>
        <h1 style="letter-spacing: 4px">${otp}</h1>
        <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        <p>If you did not register, please ignore this email.</p>
    `

    await sendEmail({
        email,
        subject: "UrbanVastra - Verify your email",
        message
    })

    return res
    .status(201)
    .json(new apiResponse(201, "Registration successful. OTP sent to your email"))
})

export const verifyOtp = asyncHandler(async(req, res) => {
    const {email, otp} = req.body

    if(!email || !otp){
        throw new apiError(400, "email and otp are required")
    }

    const otpRecord = await OTP.findOne({email})

    if(!otpRecord){
        throw new apiError(400, "OTP has expired or is invalid")
    }

    if(otpRecord.otp !== otp){
        throw new apiError(400, "incorrect otp")
    }

    const user = await User.findOneAndUpdate(
        {email},
        {isVerified: true},
        {new: true}
    ).select("-password")

    if(!user){
        throw new apiError(404, "user not found")
    }

    const token = generateToken(user._id)

    await OTP.findOneAndDelete({email})

    return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(new apiResponse(200, {user, token}, "otp verified successfully"))
})

export const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new apiError(400, "Email and password are required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new apiError(404, "user not found")
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        throw new apiError(401, "Invalid credentials")
    }

    if(!user.isVerified){
        throw new apiError(403, "Please verify your email before logging in")
    }

    const token = generateToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password")

    return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(new apiResponse(200, {user: loggedInUser, token}, "logged in successfully"))
})

export const logoutUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(new apiResponse(200, null,  "logged out successfully"))
})

export const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({}).select("-password")

    if(!users || users.length === 0){
        throw new apiError(404, "No users found")
    }

    return res
    .status(200)
    .json(new apiResponse(200, users))
})