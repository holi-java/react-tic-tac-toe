import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import './index.css';

function Square({value, onClick:handler}) {
    return (
        <button className="square" onClick={handler}>
            {value}
        </button>
    );
}


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9),
            xIsNext: true
        };
    }

    handleClick(i) {
        this.setState(({squares, xIsNext}) => {
            if (squares[i] != null || calculateWinner(squares)) {
                return null;
            }
            squares = [...squares];
            squares[i] = this.player(xIsNext);
            return {
                squares: squares,
                xIsNext: !xIsNext
            };

        });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }

    player(xIsNext) {
        return xIsNext ? 'X' : 'O';
    };

    render() {
        const winner = calculateWinner(this.state.squares);
        const status = winner ? `Winner:${winner}` : `Next player: ${this.player(this.state.xIsNext)}`;
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('container')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
