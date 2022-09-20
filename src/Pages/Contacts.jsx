import React from 'react';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const Contacts = () => {
    return (
        <div>
            <Header />
            <div className="contacts-wrapper">
                <h2>Контакты</h2>
                <p>Наш головной офис расположен в г.Москва, по адресу: Варшавское шоссе, д. 17, бизнес-центр W
                    Plaza.</p>
                <h5>Координаты для связи:</h5>
                <p>Телефон: <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a> (ежедневно: с 09-00 до 21-00)</p>
                <p>Email: <a href="mailto:office@bosanoga.ru">office@bosanoga.ru</a></p>
            </div>
            <Footer />
        </div>
    );
};

export default Contacts;