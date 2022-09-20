import Header from "../Components/Header/Header";
import Bestsellers from "../Components/Bestsellers/Bestsellers";
import ProductList from "../Components/ProductList/ProductList";
import Footer from "../Components/Footer/Footer";
import Categories from "../Components/Categories/Categories";
import React, {useState} from "react";



function MainPage() {
    const [searchText, setSearchText] = useState(null);
    const [category, setCategory] = useState(11);
    const handleChosenCat = (id) => {
        setCategory(id);
    }
    const handleSearchText = (e) => {
        setSearchText(e);
    }
    return (
        <div className="App">
            <Header headerSearch={(e) => handleSearchText(e)}/>
            <Bestsellers />
            <h2>Каталог</h2>
            <Categories click={(id) => handleChosenCat(id)} searchText={searchText}/>
            <ProductList category={category} />
            <Footer />
        </div>
);
}

export default MainPage;
