import { Userstate } from "@/Types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const Register = createAsyncThunk(
  "user/register",
  async (
    values: {
      name: string;
      email: string;
      password: string;
      rePassword: string;
      phone: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const Login = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values,
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (values: { email: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values,
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const VerifyResetCode = createAsyncThunk(
  "user/verifyResetCode",
  async (values: { resetCode: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values,
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    values: { email: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values,
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
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
      state.loading = true;
      state.error = null;
    });
    builder.addCase(Register.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(Register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });

    // * Login
    builder.addCase(Login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(Login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.isLoggedIn = true;
    });

    builder.addCase(Login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });

    // * ForgotPassword
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });

    // * VerifyResetCode
    builder.addCase(VerifyResetCode.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(VerifyResetCode.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(VerifyResetCode.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });

    // * ResetPassword
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(resetPassword.rejected, (state, action) => {
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
