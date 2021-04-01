  function GameStatusView(props) {
    if (props.gameComplete) {
        return <>
            <div>GAME COMPLETE!</div>
            <div>You used {props.turnNo - 1} turns</div>
            <div><button className='game-button' onClick={props.initGame}>Play again?</button></div>
        </>;
    } else {
        return <>
            <div>
                Turn: {props.turnNo}   Pairs found: {props.pairsFound}
            </div>
			</>;
    }
}

export default GameStatusView;

// add timer