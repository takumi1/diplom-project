import React, {useEffect, useState} from 'react';
import Header from "../Components/Header/Header";
import ProductList from "../Components/ProductList/ProductList";
import Footer from "../Components/Footer/Footer";
import SearchForm from "../Components/SearchForm/SearchForm";
import Categories from "../Components/Categories/Categories";
import {useLocation} from "react-router";


const Catalog = (props) => {
    const location = useLocation()
    let propsSearch  = location.state;
    const [category, setCategory] = useState(11);
    const [searchText, setSearchText] = useState(null);

    useEffect(() => {
        if (propsSearch) setSearchText(propsSearch.myState)
    }, [propsSearch]);

    const handleChosenCat = (id) => {
        setCategory(id);
    }

    const handleSearchText = (e) => {
        if (!propsSearch) setSearchText(e);
    }



    return (
        <div>
            <Header headerSearch={(e) => handleSearchText(e)}/>
            <SearchForm searchText={searchText} change={(e) => handleSearchText(e)}/>
            <Categories click={(id) => handleChosenCat(id)} searchText={searchText}/>
            <ProductList category={category} searchText={searchText} />
            <Footer />
        </div>
    );
};

export default Catalog;