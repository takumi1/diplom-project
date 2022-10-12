import React from 'react';
import s from './Footer.module.css'
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <footer className={s.footerContainer}>
            <div className={s.information}>
                <div className={s.menuHeader}><h4>Информация</h4></div>
                <div className={s.menuList}>
                    <div><NavLink className='link' to='/about'>О магазине</NavLink></div>
                    <div><NavLink className='link' to='/catalog'>Каталог</NavLink></div>
                    <div><NavLink className='link' to='/contacts'>Контакты</NavLink></div>
                </div>
            </div>
            <div className={s.payment}>
                <div className={s.paymentHeader}>Принимаем к оплате:</div>
                <div className={s.paymentSprite}>
                    <div className={s.paymentFirst}></div>
                    <div className={s.paymentSecond}></div>
                </div>
                <div className={s.shopDescription}>
                    2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров. Все права защищены. <br/>
                    Доставка по всей России!
                </div>
            </div>
            <div className={s.contacts}>
                <div className={s.contactsHeader}><h4>Контакты:</h4></div>
                <div className={s.contactsText}>
                    +7 495 00 00 00 00
                    <br />
                <span>Ежедневно: с 00-00 до 00-00</span>
                    <br />
                    office@bosanoga.ru
                </div>
                <div className={s.socialIcons}></div>
            </div>
        </footer>
    );
};

export default Footer;