import React from 'react';

const SizeButton = (props) => {
    return (
        <button onClick={() => props.changeActive(props.name)} className={props.active === props.name ? 'activeSizeButton' : 'sizeButton'}>
           {props.name}
        </button>
    );
};

export default SizeButton;