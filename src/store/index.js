import { configureStore } from '@reduxjs/toolkit';
import bestsellersReducer from './bestsellersSlice'
import catalogReducer from './catalogSlice'
import categoryReducer from './categorySlice'
import cartUpdateReducer from "./cartUpdateSlice";
import postOrderReducer from "./postOrderSlice";


export default configureStore({
    reducer: {
        bestsellers: bestsellersReducer,
        products: catalogReducer,
        categories: categoryReducer,
        cart: cartUpdateReducer,
        order: postOrderReducer
    },
});
