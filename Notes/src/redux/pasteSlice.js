import { createSlice } from '@reduxjs/toolkit';
// import { Toaster } from 'react-hot-toast';
// Define the initial state
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

// Create the slice
export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    //   toast("Paste Created Successfully");
    },

    updateToPastes: (state, action) => {
      const index = state.pastes.findIndex(paste => paste.id === action.payload.id);
      if (index !== -1) {
        state.pastes[index] = action.payload;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((item) => 
    item._id === pasteId);

      if(index >= 0)
      {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
