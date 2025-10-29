import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProps } from "../../utils/interfaces";

export interface UserState {
  authenticated: boolean;
  users: UserProps[];
}

const initialState: UserState = {
  authenticated: false,
  users: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.authenticated = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload.users;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, updateUsers, logout } = userSlice.actions;

export default userSlice.reducer;
