import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    authUser: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    //Reducers
    reducers: {
        isAuthenticated: (state, action) => {
            state.authUser = action.payload
        },
        logout: (state) => {
            state.authUser = null
        }
    }
})

export const {isAuthenticated, logout} = authSlice.actions;
export default authSlice.reducer;