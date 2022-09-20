import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from './ProductList.module.css'
import PreviewCard from "../PreviewCard/PreviewCard";
import {
    fetchCatalog,
    fetchFilteredCatalog, fetchFilteredCategory,
    fetchLoadMore,
    fetchLoadMoreCategory, fetchLoadMoreFiltered,
    fetchLoadMoreFilteredCategory
} from "../../store/catalogSlice";

const ProductList = (props) => {

    const [activeCategory, setActiveCategory] = useState();
    const [loadPosition, setLoadPosition] = useState(6);
    const [productArray, setProductArray] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const products = useSelector(state => state.products.products);
    const {status} = useSelector(state => state.products)

    useEffect(() => {
        if (props.category === 11 && props.searchText) {
            dispatch(fetchFilteredCatalog(props.searchText))
        } else {
            dispatch(fetchFilteredCategory({txt: props.searchText, cat: activeCategory}))
        }

    }, [props.searchText]);

    useEffect(() => {
        if (status === 'rejected') alert('Приносим извинения. Технические неполадки. Попробуйте перезагрузить страницу.')
    }, [status]);

    const dispatch = useDispatch();
    const handleLoadingMethod = () => {
        setUpdateList(true);
    }

    const handleLoadMore = () => {
        if (props.category === 11 && !props.searchText) {
            setUpdateList(true);
            dispatch(fetchLoadMore(loadPosition));
            setLoadPosition(loadPosition + 6);
            handleLoadingMethod();
        } else if (props.category === 11 && props.searchText) {
            setUpdateList(true);
            dispatch(fetchLoadMoreFiltered({txt: props.searchText, cat: activeCategory, pos: loadPosition}));
            setLoadPosition(loadPosition + 6);
        } else if (props.searchText) {
            setUpdateList(true);
            dispatch(fetchLoadMoreFilteredCategory({txt: props.searchText, cat: activeCategory, pos: loadPosition}));
            setLoadPosition(loadPosition + 6);
        } else {
            setUpdateList(true);
            dispatch(fetchLoadMoreCategory({pos: loadPosition, cat: activeCategory}));
            setLoadPosition(loadPosition + 6);
            handleLoadingMethod();
        }

    }

    useEffect(() => {
        setActiveCategory(props.category);
    }, [handleLoadMore]);

    useEffect(() => {
        if (updateList === true) {
            setProductArray(productArray => [...productArray, ...products])
            setUpdateList(false)
        } else if (products.length >= 0) {
            setProductArray([...products])
            setLoadPosition(6)
        }
    }, [products]);


    useEffect(() => {
        dispatch(fetchCatalog())
    }, []);

    return (
        <div className={s.container}>
            <div className={s.innerWrapper}>
                <div className={s.productCards}>
                    {status === 'resolved' ? productArray.map((i, index) => (
                        <PreviewCard
                            key={index}
                            {...i}
                        />
                    )) : <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>}
                </div>
            </div>
            {products.length != 0 ?
                <div className={s.buttonWrapper}>
                    <button className={s.loadMoreButton} onClick={() => handleLoadMore()}>Загрузить ещё</button>
                </div> : ''

            }

        </div>
    );
};

export default ProductList;