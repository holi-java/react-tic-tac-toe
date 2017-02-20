import React, {Component} from 'react';
import Board from './Board';

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            asc: true,
            history: [{
                squares: Array(9).fill(null)
            }],
            position: 0
        };
    }

    player(step) {
        return step % 2 === 0 ? 'X' : 'O';
    }

    handleClick = (i) => {
        this.setState(({history, position}) => {
            let squares = [...history[position].squares];
            if (squares[i] != null || calculateWinner(squares)) {
                return null;
            }
            squares[i] = this.player(position);

            return {
                history: history.slice(0, position + 1).concat([{squares: squares}]),
                position: position + 1
            };

        });
    };

    jumpTo(step) {
        this.setState({position: step});
    }

    get status() {
        let {history, position} = this.state;
        let {squares} = history[position];
        const winner = calculateWinner(squares);
        return winner ? `Winner:${winner}` : `Next player: ${this.player(position)}`;
    }

    get current() {
        let {history, position} = this.state;
        return history[position];
    }

    get steps() {
        let {history, asc}=this.state;
        let snapshot = [...history];

        return (asc ? snapshot : snapshot.reverse()).map((_, step) => {
            return (<li key={step.toString()}> {this.step(asc ? step : snapshot.length - 1 - step)} </li>);
        });
    }

    step(step) {
        return <a href="#" onClick={() => this.jumpTo(step)}>{this.descriptionOf(step)}</a>;
    }

    descriptionOf(step) {
        let {position} =this.state;
        const desc = step > 0 ? `Move #${step}` : 'Game start';
        return position === step ? <b>{desc}</b> : desc;
    }

    render() {
        let {status, steps, handleClick, current:{squares}, state:{asc}}=this;

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares} onClick={handleClick}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <button onClick={() => this.setState({asc: !asc})}>{asc ? "DESC" : "ASC"}</button>
                    </div>
                    <ol>{steps}</ol>
                </div>
            </div>
        );
    }
}


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
