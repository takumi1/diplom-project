import React from 'react';


const CategoryItem = (props) => {

    return (
        <div>
            <li className={props.activeCat === props.id ? 'liActive' : 'liInactive'}
                onClick={() => props.click(props.id)}>{props.title}</li>
        </div>
    );
};

export default CategoryItem;