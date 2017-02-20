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

    renderSquare(i) {
        let {squares, onClick}=this.props;
        return <Square value={squares[i]} onClick={() => onClick(i)}/>;
    }


    render() {
        return (
            <div>
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
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        };
    }

    player(xIsNext) {
        return xIsNext ? 'X' : 'O';
    }

    handleClick = (i) => {
        console.log(i);
        this.setState(({history, xIsNext}) => {
            let squares = history[history.length - 1].squares;
            if (squares[i] != null || calculateWinner(squares)) {
                return null;
            }
            squares = [...squares];
            squares[i] = this.player(xIsNext);
            return {
                history: [...history, {squares: squares}],
                xIsNext: !xIsNext
            };

        });
    };

    render() {
        let {history, xIsNext} = this.state;
        let {squares:squares} = history[history.length - 1];
        const winner = calculateWinner(squares);
        const status = winner ? `Winner:${winner}` : `Next player: ${this.player(xIsNext)}`;
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares} onClick={this.handleClick}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
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
