import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const initialState = {
  show: false,
};
const openModal = createSlice({
  name: "modal",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleClose, (state) => {
      state.show = false;
    });
    builder.addCase(handleShow, (state) => {
      state.show = true;
    });
  },
});

const modalReducer = openModal.reducer;
export { modalReducer, handleClose, handleShow };
