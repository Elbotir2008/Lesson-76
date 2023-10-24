import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/students")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
});

const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error;
    });
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      console.log(state.users);
    },
  },
});

export const { addUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export { userReducer, fetchUsers };
