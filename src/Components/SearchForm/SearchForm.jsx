import React, {useRef} from 'react';
import s from './SearchForm.module.css'

const SearchForm = (props) => {
    const inputValue = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.change(inputValue.current.value)
    }
    return (
        <div>
            <div className={s.catalogTitle}>Каталог</div>
            <form className={s.searchForm} onSubmit={(e) => handleSubmit(e)}>
                <input className={s.searchInput} defaultValue={props.searchText ? props.searchText : ''} ref={inputValue} type="text" placeholder='Поиск'/>

            </form>
        </div>
    );
};

export default SearchForm;