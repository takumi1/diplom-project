import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value: 0,
}

export const cartUpdateSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        setCartIndex: (state, action) => {
            state.value = action.payload
        },
    },
    extraReducers: {},
});

export const { increment, decrement, setCartIndex } = cartUpdateSlice.actions
export default cartUpdateSlice.reducer;