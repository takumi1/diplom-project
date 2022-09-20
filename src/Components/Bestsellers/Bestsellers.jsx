import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { fetchBestsellers } from "../../store/bestsellersSlice";
import PreviewCard from "../PreviewCard/PreviewCard";
import s from './Bestsellers.module.css'

const Bestsellers = () => {
    const dispatch = useDispatch();
    const bestsellers = useSelector(state => state.bestsellers.bestsellers);
    const {status, action, error} = useSelector(state => state.bestsellers);
    useEffect(() => {
        dispatch(fetchBestsellers());
    }, [dispatch]);
    useEffect(() => {
        if (status === 'rejected') alert('Приносим извинения. Технические неполадки. Попробуйте перезагрузить страницу.')
    }, [status]);
    return (
        <div className={s.container}>
            <div className={s.innerWrapper}>
            <h2>Хиты продаж!</h2>
            <div className={s.productCard}>
                {status === 'resolved' ? bestsellers.map((i) => (
                    <PreviewCard
                        key={i.id}
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
        </div>
    );
};

export default Bestsellers;