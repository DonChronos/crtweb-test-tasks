import React, { Component } from 'react';
import './Game.css';
import CardView from './cardView';
import { connect } from 'react-redux'
import { flipUpCard, checkUnmatchedPair, checkMatchedPair, initGame } from './actions';
import GameStatusView from './GameStatusView';

let timeOut = null;
let timer = null;

class Game extends Component {
    render() {
        const cardViews = this.getCardViews();
        let gameHUD = undefined;

        if (!this.props.gameStarted) {
            gameHUD = <button onClick={() => {
				this.props.onInitGame();
				this.props.startTimer()}}>Play</button>;
        } else {
            gameHUD = <GameStatusView
                gameComplete={this.props.gameComplete}
                turnNo={this.props.turnNo}
                pairsFound={this.props.pairsFound}
				initGame={this.props.onInitGame}
				second={this.props.second}
				minute={this.props.minute}
            />;
        }

        return (
            <div className='game'>
                <header className='game-header'>
                    <div className='game-title'>A Memory game in React with Redux</div>
                </header>
                <div className='game-status'>
                    {gameHUD}
                </div>
                <div className='card-container'>
                    {cardViews}
                </div>
            </div>
        );
    }

    getCardViews() {
		console.log(this.props);
        const cardViews = this.props.cards.map(c =>
            <CardView key={c.id}
                id={c.id}
                image={c.image}
                imageUp={c.imageUp}
                matched={c.matched}
                onClick={this.props.onCardClicked} />
        );
        return cardViews;
    }
}


const mapStateToProps = state => {
    return {
        cards: state.cards,
        turnNo: state.turnNo,
        gameComplete: state.gameComplete,
        pairsFound: state.pairsFound,
        gameStarted: state.gameStarted,
		second: state.second,
		minute: state.minute,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCardClicked: id => {
            clearInterval(timeOut);
            dispatch(flipUpCard(id));
            dispatch(checkMatchedPair());
            timeOut = setTimeout(() => {
                dispatch(checkUnmatchedPair())
            }, 4000);
        },
        onInitGame: () => {
            dispatch(initGame());
        },
		startTimer: () => {
			clearInterval(timer);
			timer = setInterval(() => dispatch({ type: "TIMER_TICK" }), 1000);
			dispatch({ type: "TIMER_START" });
			dispatch({ type: "TIMER_TICK" });
		},
		stopTimer: () => {
			clearInterval(timer);
			dispatch({ type: "TIMER_STOP" });
		}
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;