import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchPostOrder = createAsyncThunk(
    'bestsellers/fetchPostOrder',
    async function (body, {rejectWithValue}) {
        try {
            const response = await fetch('http://diplomserv34.herokuapp.com/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const postOrderSlice = createSlice({
    name: 'postOrder',
    initialState: {
        body: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchPostOrder.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchPostOrder.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.bestsellers = action.payload;
        },
        [fetchPostOrder.rejected]: setError,
    },
});


export default postOrderSlice.reducer;