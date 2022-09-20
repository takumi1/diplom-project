import React from 'react';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const NotFound = () => {
    return (
        <div>
            <Header />
            <section className="top-sales">
                <h2 className="text-center">Страница не найдена</h2>
                <p style={{textAlign:'center', marginBottom:'12em'}}>
                    Извините, такая страница не найдена!
                </p>
            </section>
            <Footer />
        </div>
    );
};

export default NotFound;