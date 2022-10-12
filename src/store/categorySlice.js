import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://diplomserv34.herokuapp.com/api/categories');
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

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.categories = action.payload;
        },
        [fetchCategories.rejected]: setError,
    },
});


export default categorySlice.reducer;