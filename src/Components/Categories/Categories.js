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
    const CATEGORY_ID_ALL = 11
    const [activeCategory, setActiveCategory] = useState(CATEGORY_ID_ALL)

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
                <li className={activeCategory == CATEGORY_ID_ALL ? 'liActive' : 'liInactive'}
                    onClick={() => handleAllClick(CATEGORY_ID_ALL)}>Все
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