import React, {useRef, useState} from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = (props) => {
    const cartState = useSelector(state => state.cart.value);
    const [showSearchField, setShowSearchField] = useState(false);
    const [searchText, setSearchText] = useState(null);
    const handleSearchClick = () => {
        setShowSearchField(true)
    }
    const inputValue = useRef(null);
    const handleChange = (e) => {
        setSearchText(inputValue.current.value)
    }
    const enterBehavior = (e) => {
        if (e.keyCode === 13) e.preventDefault()
    }

    return (
        <header className={s.container}>
            <div className={s.menu}>
                <div className={s.mainPart}>
                    <NavLink className={({isActive}) => (!isActive ? 'link' : 'linkActive')} to='/'>
                        <div className={s.logo}></div>
                    </NavLink>
                    <div className={s.links}>
                        <div><NavLink className={({isActive}) => (!isActive ? 'link' : 'linkActive')}
                                      to='/'>Главная</NavLink></div>
                        <div><NavLink className={({isActive}) => (!isActive ? 'link' : 'linkActive')}
                                      to='/catalog'>Каталог</NavLink></div>
                        <div><NavLink className={({isActive}) => (!isActive ? 'link' : 'linkActive')} to='/about'>О
                            магазине</NavLink></div>
                        <div><NavLink className={({isActive}) => (!isActive ? 'link' : 'linkActive')}
                                      to='/contacts'>Контакты</NavLink></div>
                    </div>
                </div>
                <div className={s.options}>
                    {showSearchField ?
                        <>
                            <form onChange={(e) => handleChange(e)}>
                                <input className={s.searchInput} onKeyDown={(e) => enterBehavior(e)} ref={inputValue} type="text" placeholder='Поиск'/>

                            </form>
                        <NavLink state={{ myState: searchText }} to='/catalog'>
                            <div className={s.search}></div>
                        </NavLink>
                        </>
                        :
                        <div onClick={handleSearchClick} className={s.search}></div>
                    }
                    <NavLink className={s.cart} to='/cart'></NavLink>

                    {
                        cartState === 0 ?
                            <div className={s.hiddenQuantity}></div> :
                                <div className={s.cartQuantity}>{cartState}</div>
                    }

                </div>
            </div>
            <div className={s.banner}>
            </div>
        </header>
    );
};

export default Header;