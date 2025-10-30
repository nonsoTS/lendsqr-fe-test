import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProps } from "../../utils/interfaces";

export interface UserState {
  authenticated: boolean;
  filteredUsers: UserProps[];
  allUsers: UserProps[];
}

const initialState: UserState = {
  authenticated: false,
  filteredUsers: [],
  allUsers: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.authenticated = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateFilteredUsers: (state, action: PayloadAction<any>) => {
      state.filteredUsers = action.payload.filteredUsers;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateAllUsers: (state, action: PayloadAction<any>) => {
      state.allUsers = action.payload.allUsers;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, updateFilteredUsers, updateAllUsers, logout } = userSlice.actions;

export default userSlice.reducer;
