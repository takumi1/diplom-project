import React from 'react';
import s from './PreviewCard.module.css'
import {NavLink} from "react-router-dom";

const PreviewCard = (props) => {
    const splitPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return (
        <div className={s.container}>
            <div className={s.productImage} style={{backgroundImage: `url("${props.images[0]}")`}}></div>
            <div className={s.productDescription}>
                <div className={s.name}>{props.title}</div>
                <div className={s.price}>{splitPrice(props.price)} руб.</div>

                <NavLink className={s.buyButton} to={`/productcard/${props.id}`}>Заказать</NavLink>
            </div>
        </div>
    );
};

export default PreviewCard;