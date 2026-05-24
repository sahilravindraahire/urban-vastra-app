import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios.js";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/register", userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "registration failed",
      );
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/verify-otp", otpData);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", credentials);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "login failed");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log("Logout API error: ", error.message);
    }
  },
);

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/auth/users");
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch users",
      );
    }
  },
);
