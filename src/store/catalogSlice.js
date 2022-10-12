import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCatalog = createAsyncThunk(
    'products/fetchCatalog',
    async function (_, {rejectWithValue}) {

        try {
            const response = await fetch('http://diplomserv34.herokuapp.com/api/items');
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


export const fetchFilteredCatalog = createAsyncThunk(
    'products/fetchFilteredCatalog',
    async function (e, {rejectWithValue}) {
        try {
            const response = await fetch(`http://diplomserv34.herokuapp.com/api/items?q=${e}`);
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


export const fetchCategorizedCatalog = createAsyncThunk(
    'products/fetchCategorizedCatalog',
    async function (id, {rejectWithValue}) {
        try {
            const response = await fetch(`http://diplomserv34.herokuapp.com/api/items?categoryId=${id}`);
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

export const fetchLoadMore = createAsyncThunk(
    'products/fetchLoadMore',
    async function (p, {rejectWithValue}) {
        try {

            const response = await fetch(`http://diplomserv34.herokuapp.com/api/items?offset=${p}`);
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


export const fetchLoadMoreFiltered = createAsyncThunk(
    'products/fetchLoadMoreFiltered',
    async function (p, {rejectWithValue}) {
        const {pos, txt} = p;
        try {
            const response = await fetch(`http://diplomserv34.herokuapp.com/api/items?q=${txt}&offset=${pos}`);
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



export const fetchLoadMoreCategory = createAsyncThunk(
    'products/fetchLoadMoreCategory',
    async function (p, {rejectWithValue}) {
        const {pos, cat} = p;
        try {

            const response = await fetch(`http://diplomserv34.herokuapp.com/api/items?categoryId=${cat}&offset=${pos}`);
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


export const fetchFilteredCategory = createAsyncThunk(
    'products/fetchFilteredCategory',
    async function (p, {rejectWithValue}) {
        const {txt, cat} = p;
        try {

            const response = await fetch(`http://diplomserv34.herokuapp.com/api/items?q=${txt}&categoryId=${cat}`);
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

export const fetchLoadMoreFilteredCategory = createAsyncThunk(
    'products/fetchLoadMoreFilteredCategory',
    async function (p, {rejectWithValue}) {
        const {txt, cat, pos} = p;
        try {

            const response = await fetch(`http://diplomserv34.herokuapp.com/api/items?q=${txt}&categoryId=${cat}&offset=${pos}`);
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

export const fetchGetProductCard = createAsyncThunk(
    'products/fetchGetProductCard',
    async function (id, {rejectWithValue}) {
        try {
            const response = await fetch(`http://diplomserv34.herokuapp.com/api/items/${id}`);
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


const setPending = (state) => {
    state.status = 'loading';
    state.error = null;
}
const setFulfilled = (state, action) => {
    state.status = 'resolved';
    state.products = action.payload;
}
const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const catalogSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchCatalog.pending]: setPending,
        [fetchCatalog.fulfilled]: setFulfilled,
        [fetchCatalog.rejected]: setError,

        [fetchCategorizedCatalog.pending]: setPending,
        [fetchCategorizedCatalog.fulfilled]: setFulfilled,
        [fetchCategorizedCatalog.rejected]: setError,

        [fetchLoadMore.pending]: setPending,
        [fetchLoadMore.fulfilled]: setFulfilled,
        [fetchLoadMore.rejected]: setError,

        [fetchLoadMoreCategory.pending]: setPending,
        [fetchLoadMoreCategory.fulfilled]: setFulfilled,
        [fetchLoadMoreCategory.rejected]: setError,

        [fetchFilteredCatalog.pending]: setPending,
        [fetchFilteredCatalog.fulfilled]: setFulfilled,
        [fetchFilteredCatalog.rejected]: setError,

        [fetchLoadMoreFiltered.pending]: setPending,
        [fetchLoadMoreFiltered.fulfilled]: setFulfilled,
        [fetchLoadMoreFiltered.rejected]: setError,

        [fetchFilteredCategory.pending]: setPending,
        [fetchFilteredCategory.fulfilled]: setFulfilled,
        [fetchFilteredCategory.rejected]: setError,

        [fetchLoadMoreFilteredCategory.pending]: setPending,
        [fetchLoadMoreFilteredCategory.fulfilled]: setFulfilled,
        [fetchLoadMoreFilteredCategory.rejected]: setError,

        [fetchGetProductCard.pending]: setPending,
        [fetchGetProductCard.fulfilled]: (state, action) => {
            state.status = 'resolvedProduct';
            state.products = action.payload;
        },
        [fetchGetProductCard.rejected]: setError,
    },
});


export default catalogSlice.reducer;