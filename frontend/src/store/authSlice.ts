import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk<
  string,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/signUp", async (formValues, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/signup", formValues);
    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
    return access_token;
  } catch (error: any) {
    const msg = error?.response?.data?.message || "Sign up failed";
    return rejectWithValue(msg);
  }
});

export const signIn = createAsyncThunk<
  string,
  { email: string; password: string },
  {
    rejectValue: string;
  }
>("auth/signIn", async (formValues, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/signin", formValues);
    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
    return access_token;
  } catch (error: any) {
    const msg = error?.response?.data?.message || "Sign in failed";
    return rejectWithValue(msg);
  }
});

export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  {
    rejectValue: string;
  }
>("auth/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axiosInstance.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  } catch (error: any) {
    const msg = error?.response?.data?.message || "Failed to fetch profile";
    return rejectWithValue(msg);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
