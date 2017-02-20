import React from 'react';

export default function Square({value, onClick:handler}) {
    return (
        <button className="square" onClick={handler}>
            {value}
        </button>
    );
}