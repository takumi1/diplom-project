import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchBestsellers = createAsyncThunk(
    'bestsellers/fetchBestsellers',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('http://diplomserv34.herokuapp.com/api/top-sales');
            if (!response.ok) {
                throw new Error('Server Error');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const bestsellersSlice = createSlice({
    name: 'bestsellers',
    initialState: {
        bestsellers: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchBestsellers.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchBestsellers.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.bestsellers = action.payload;
        },
        [fetchBestsellers.rejected]: setError,

    },
});


export default bestsellersSlice.reducer;