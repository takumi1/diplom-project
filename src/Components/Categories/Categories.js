import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../store/categorySlice";
import CategoryItem from "./CategoryItem";
import s from './Categories.module.css'
import {
    fetchCatalog,
    fetchCategorizedCatalog,
    fetchFilteredCatalog,
    fetchFilteredCategory
} from "../../store/catalogSlice";


const Categories = (props) => {

    const [activeCategory, setActiveCategory] = useState(11)

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);


    const handleClick = (i) => {
        props.click(i.id)
        if (props.searchText === null) {
            dispatch(fetchCategorizedCatalog(i.id));
            setActiveCategory(i.id)
        } else {
            dispatch(fetchFilteredCategory({txt: props.searchText, cat: i.id}))
            setActiveCategory(i.id)
        }
    }


    const handleAllClick = (id) => {
        props.click(id)
        if (props.searchText === null) {
            dispatch(fetchCatalog())
            setActiveCategory(id)
        } else {
            dispatch(fetchFilteredCatalog(props.searchText))
            setActiveCategory(id)
        }
    }

    useEffect(() => {
        dispatch(fetchCategories());

    }, []);

    return (
        <div>

            <ul className={s.list}>
                <li className={activeCategory == 11 ? 'liActive' : 'liInactive'}
                    onClick={() => handleAllClick(11)}>Все
                </li>
                {categories.map((i) => (
                    <CategoryItem
                        key={i.id}
                        {...i}
                        click={() => handleClick(i)}
                        activeCat={activeCategory}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Categories;