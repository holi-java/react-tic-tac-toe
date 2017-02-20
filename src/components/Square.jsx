import React from 'react';

export default function Square({value, highlight, onClick:handler}) {
    let cssClass = `square ${highlight ? 'square-highlight' : value ? 'square-' + value.toLowerCase() : ''}`;
    return (
        <button className={cssClass} onClick={handler}>
            {value}
        </button>
    );
}