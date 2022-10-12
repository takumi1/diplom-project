import React, {useEffect, useState} from 'react';
import s from './BuyerCart.module.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {decrement, setCartIndex} from "../../store/cartUpdateSlice";
import shortid from 'shortid';
import {fetchPostOrder} from "../../store/postOrderSlice";

const BuyerCart = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart.value);
    const {status, action, error} = useSelector(state => state.products);
    let price = 0;
    let parsedArr = [];
    const [parsedStorage, setParsedStorage] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [successOrder, setSuccessOrder] = useState(false)

    useEffect(() => {
    let lsLength = localStorage.length;
    let key = localStorage.key(lsLength-1)
    let item = JSON.parse(localStorage.getItem(key));
    if (item && item.title === undefined) localStorage.clear()
    }, []);

    const calcMax = () => {
        let keyArr = []
        for (let i = 0; i <= localStorage.length; i++) {
            keyArr.push(+localStorage.key(i))
        }
        return Math.max(...keyArr) + 1
    }

    useEffect(() => {
        if (status === 'rejected') alert('Приносим извинения. Технические неполадки. Попробуйте перезагрузить страницу.')
    }, [status]);

    useEffect(() => {
        let order = 1;
        for (let i = 0; i <= calcMax(); i++) {
            let lsItem = JSON.parse(localStorage.getItem(i + 1));
            if (lsItem != null && lsItem.id != null) {
                console.log(lsItem.id)
                lsItem.orderId = order;
                order += 1
                parsedArr.push(lsItem)
            }
        }
        setParsedStorage(parsedArr)
    }, [cartState]);

    useEffect(() => {
        if (parsedStorage) {
            parsedStorage.map((e) => (
                price += e.price * e.quantity
            ))
        }
        setTotalPrice(price)
    }, [parsedStorage]);

    const handleClick = (e) => {
        localStorage.removeItem(e)
        dispatch(decrement())
    }

    const postOrder = (e) => {
        e.preventDefault()
        let items = parsedStorage.map((e) => (
            {
                "id": e.rangeId,
                "price": e.price,
                "count": e.quantity
            }
        ))
        let orderBody = {
            "owner": {
                "phone": e.target.phone.value,
                "address": e.target.address.value,
            },
            "items": items
        }
        dispatch(fetchPostOrder(orderBody))
        localStorage.clear()
        dispatch(setCartIndex(0))
        setSuccessOrder(true)
    }

    return (
        <>
            <Header/>
            <div className={s.wrapper}>
                <div className={s.cart}>
                    <div className={s.cartTitle}>Корзина</div>
                    <div className={s.cartTable}>

                        <table className={s.table}>
                            <tbody>
                            <tr className={s.tableTitles}>
                                <td>#</td>
                                <td>Название</td>
                                <td>Размер</td>
                                <td>Кол-во</td>
                                <td>Стоимость</td>
                                <td>Итого</td>
                                <td>Действия</td>
                            </tr>
                            {
                                !parsedStorage.length ?
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    : ('')
                            }

                            {
                                parsedStorage ? parsedStorage.map((e) => (
                                    <tr key={shortid.generate()}>

                                        <td>{e.orderId}</td>
                                        <td>{e.title}</td>
                                        <td>{e.size}</td>
                                        <td>{e.quantity}</td>
                                        <td>{e.price}</td>
                                        <td>{e.price * e.quantity}</td>
                                        <td>
                                            <button className={s.deleteButton}
                                                    onClick={() => handleClick(e.id)}>Удалить
                                            </button>
                                        </td>
                                    </tr>
                                )) : ('')
                            }

                            <tr>
                                <td className={s.total} colSpan="5">Общая стоимость</td>
                                <td>{
                                    totalPrice
                                }</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {successOrder ?
                    <div className={s.orderSuccess}>Ваш заказ принят! <br/> Спасибо!</div> :

                    <>
                        <div className={s.orderTitle}>Оформить заказ</div>
                        <div className={s.makeOrder}>

                            <form onSubmit={(e) => {
                                postOrder(e)
                            }} className={s.orderForm} action="">
                                <label className={s.phoneLabel} htmlFor="phone">
                                    <span>Телефон</span>
                                    <input className={s.phoneInput} placeholder='Ваш телефон' id="phone" type="text"
                                           name="phone"/>
                                </label>
                                <label className={s.addressLabel} htmlFor="address">
                                    <span>Адрес доставки</span>
                                    <input className={s.addressInput} placeholder='Адрес доставки' id="address"
                                           type="text" name="address"/>
                                </label>
                                <div className={s.rulesAccept} htmlFor="accept">
                                    <input id="accept" type="checkbox" name="accept"/>
                                    <div>Согласен с правилами доставки</div>
                                </div>
                                <div className={s.buttonWrapper}>
                                    <button className={s.orderButton}>Оформить</button>
                                </div>
                            </form>
                        </div>
                    </>
                }
            </div>
            <Footer/>
        </>
    );
};

export default BuyerCart;