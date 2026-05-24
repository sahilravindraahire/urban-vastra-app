import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios.js";

export const fetchProducts = createAsyncThunk(
  "product/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/products");
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch products",
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/products/${id}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch product",
      );
    }
  },
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to update product",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async(id, {rejectWithValue}) => {
        try {
            await API.delete(`/products/${id}`)
            return id
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)