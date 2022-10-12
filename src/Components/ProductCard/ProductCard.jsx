import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetProductCard} from "../../store/catalogSlice";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import s from './ProductCard.module.css'
import SizeButton from "./SizeButton";
import {increment} from "../../store/cartUpdateSlice";
import shortid from "shortid";
import Loader from "../Loader/Loader";


const ProductCard = (props) => {
    const cartState = useSelector(state => state.cart.value);
    let sizes;
    const sizeList = [];
    const products = useSelector(state => state.products.products);
    const {status} = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [active, setActive] = useState(null);
    const [sizeArr, setSizeArr] = useState([])
    const [quant, setQuant] = useState(1)
    const params = useParams();

    let quantityCalc = (operation) => {
        if (operation === 'plus' && quant <= 10) {
            setQuant(prev => prev + 1)
        } else {
            setQuant(prev => prev - 1)
        }
    }

    useEffect(() => {
        if (status === 'rejected') alert('Приносим извинения. Технические неполадки. Попробуйте перезагрузить страницу.')
    }, [status]);

    useEffect(() => {
        dispatch(fetchGetProductCard(params.id))
    }, [props.id]);

    if (!products.length && status === 'resolvedProduct') {
        sizes = products.sizes.filter(item => item.avalible === true)
    }

    useEffect(() => {
        if (!products.length && status === 'resolvedProduct') {
            sizes.map((i, index) => (
                sizeList.push(i.size)
            ))
        }
        setSizeArr(sizeList)
    }, [status]);

    const calcMax = () => {
        let keyArr = []
        for (let i = 0; i <= localStorage.length; i++) {
            keyArr.push(+localStorage.key(i))
        }
        return Math.max(...keyArr) + 1
    }

    const setCart = () => {
        if (active) {
            let sameItem = false;
            let item = {
                id: calcMax(),
                rangeId: products.id,
                title: products.title,
                quantity: quant,
                size: active,
                price: products.price
            }

            for (let i = 0; i < cartState; i++) {

                let lsItem = JSON.parse(localStorage.getItem(i + 1));
                if (lsItem) {
                    if (lsItem.title === item.title && lsItem.size === item.size) {
                        lsItem.quantity += item.quantity;
                        localStorage.setItem(i + 1, JSON.stringify(lsItem));
                        sameItem = true;
                    }
                }
            }

            if (!sameItem) {
                localStorage.setItem(calcMax(), JSON.stringify(item));
                dispatch(increment())
            }
        }
    }

    return (

        <>
            <Header/>
            <div className={s.title}>{products.title}</div>
            <div className={s.wrapper}>
                <div className={s.innerPart}>
                    {status === 'resolvedProduct' ? <div className={s.picture}
                                                         style={{backgroundImage: `url("${products.images[0]}")`}}></div> :
                        <Loader />}

                    <div className={s.description}>
                        <table className={s.table}>
                            <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{products.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{products.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{products.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{products.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{products.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{products.reason}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className={s.options}>
                            <div className={s.size}>
                                <div className={s.sizeTitle}>Размеры в наличии:</div>

                                {status === 'resolvedProduct' ? sizeArr.map((e) => (
                                    <SizeButton name={e} active={active} changeActive={(e) => setActive(e)}
                                                key={shortid.generate()}/>
                                )) : ('')}


                            </div>
                            <div className={s.quantity}>
                                <button onClick={() => quantityCalc('minus')} className={s.minusButton}>-</button>
                                <div className={s.quantityField}>{quant}</div>
                                <button onClick={() => quantityCalc('plus')} className={s.plusButton}>+</button>
                            </div>
                            <div className={active ? s.toCartActive : s.toCart}>
                                <button onClick={setCart}>В корзину</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    );
};

export default ProductCard;