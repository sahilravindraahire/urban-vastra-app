import {createSlice} from "@reduxjs/toolkit"
import {registerUser, verifyOtp, loginUser, logoutUser, fetchUsers} from "../thunk/authThunk.js"

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    users: [],
    loading: false,
    error: null,
    otpSent: false,
    otpEmail: null
}

const authSilce = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {state.error = null},
        clearOtpState: (state) => {state.otpSent = false, state.otpEmail = null},
        setOtpEmail: (state, action) => {state.otpEmail = action.payload}
    },
    extraReducers: (builder) => {
        // register
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true 
            state.error = null
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false 
            state.otpSent = true
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // verifyOtp
        builder.addCase(verifyOtp.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(verifyOtp.fulfilled, (state, action) => {
            state.loading = false 
            state.user = action.payload.user
            state.token = action.payload.token
            state.otpSent = false
            state.otpEmail = null
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            localStorage.setItem("token", action.payload.token)
        })
        builder.addCase(verifyOtp.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            localStorage.setItem("token", action.payload.token)
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // logout
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        })
        // fetch Users
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false,
            state.users = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {clearError, clearOtpState, setOtpEmail} = authSilce.actions
export default authSilce.reducer