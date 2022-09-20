import React, {useEffect} from 'react';
import {Route, Routes} from "react-router";
import Catalog from "./Pages/Catalog";
import About from "./Pages/About";
import Contacts from "./Pages/Contacts";
import MainPage from "./Pages/MainPage";
import {fetchCatalog} from "./store/catalogSlice";
import {useDispatch} from "react-redux";
import ProductCard from "./Components/ProductCard/ProductCard";
import BuyerCart from "./Components/BuyerCart/BuyerCart";
import {setCartIndex} from "./store/cartUpdateSlice";
import NotFound from "./Pages/NotFound";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCatalog());
        dispatch(setCartIndex(localStorage.length))
    }, []);
    return (
        <div>
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path="/" element={<MainPage />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="about" element={<About />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="cart" element={<BuyerCart />} />
                <Route path="productcard/:id" element={<ProductCard />} />
            </Routes>
        </div>
    );
};

export default App;