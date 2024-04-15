import { createSlice } from '@reduxjs/toolkit';

export const OffcanvasSlice = createSlice({
  name: 'Offcanvas',
  initialState: {
    open: false,
  },
  reducers: {
    toggleOffcanvas: (state) => {
      state.open = !state.open; // Toggle the value of 'open'
    },
  },
});

// Action creator for toggling the offcanvas
export const { toggleOffcanvas } = OffcanvasSlice.actions;

export default OffcanvasSlice.reducer;
