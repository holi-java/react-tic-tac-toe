import React, {Component} from 'react';
import Square from './Square';

const CELLS = [1, 2, 3];

export default class Board extends Component {
    renderSquare(i) {
        let {squares, onClick, highlights}=this.props;
        return <Square highlight={highlights.includes(i)} key={`cell-${i}`} value={squares[i]} onClick={() => onClick(i)}/>;
    }

    render() {
        return <div>{ this.rows}</div>;
    }

    get rows() {
        return CELLS.map((_, row) => this.cells(row));
    }

    cells(row) {
        return (
            <div key={`row-${row}`} className="board-row">
                {CELLS.map((_, col) => this.cell(row, col))}
            </div>
        );
    }

    cell(row, col) {
        return this.renderSquare(row * 3 + col);
    }
}