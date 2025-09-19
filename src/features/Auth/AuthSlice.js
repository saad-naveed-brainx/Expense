import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = {
                name: '',
                email: '',
            };
            state.isLoggedIn = false;
        }
    }
})

const { login, logout } = authSlice.actions;

export { login, logout };
export default authSlice.reducer;