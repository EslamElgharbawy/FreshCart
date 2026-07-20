import { Userstate } from "@/Types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const Register = createAsyncThunk(
  "user/register",
  async (values: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }) => {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values,
    );
    return data;
  },
);
export const Login = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }) => {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values,
    );

    return data;
  },
);

export const VerifyToken = createAsyncThunk(
  "user/verifyToken",
  async (token: string) => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      {
        headers: {
          token,
        },
      },
    );

    return data;
  },
);

const initialState: Userstate = {
  isLoggedIn: false,
  token: null,
  user: null,
  authChecked: false,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    authChecked: (state) => {
      state.authChecked = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // *Register
    builder.addCase(Register.pending, (state) => {
      toast.loading("Creating account...", {
        id: "register",
      });
      state.loading = true;
      state.error = null;
    });
    builder.addCase(Register.fulfilled, (state) => {
      toast.success("Your account is ready. Please sign in.", {
        id: "register",
        duration: 1500,
      });
      state.loading = false;
    });
    builder.addCase(Register.rejected, (state, action) => {
      toast.error("Something went wrong", {
        id: "register",
        duration: 1500,
      });
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });

    // * Login
    builder.addCase(Login.pending, (state) => {
      toast.loading("Please wait...", {
        id: "login",
      });

      state.loading = true;
      state.error = null;
    });

    builder.addCase(Login.fulfilled, (state, action) => {
      toast.success("Welcome back", {
        id: "login",
        duration: 1500,
      });

      state.loading = false;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.isLoggedIn = true;
    });

    builder.addCase(Login.rejected, (state, action) => {
      toast.error("Invalid email or password.", {
        id: "login",
        duration: 1200,
      });

      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });

    // * VerifyToken
    builder.addCase(VerifyToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(VerifyToken.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.decoded;
      state.isLoggedIn = true;
      state.authChecked = true;
      state.token = localStorage.getItem("token");
    });

    builder.addCase(VerifyToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
      state.isLoggedIn = false;
      state.token = null;
      state.authChecked = true;
      state.user = null;

      localStorage.removeItem("token");
    });
  },
});

export const { login, logout, authChecked } = userSlice.actions;
export default userSlice.reducer;
