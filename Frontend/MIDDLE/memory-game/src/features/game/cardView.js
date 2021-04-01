import './Game.css';

function CardView(props) {
    const imPath = `${window.location.href}/images/${props.image}.jpg`;
    const backPath = `${window.location.href}/images/back.jpg`;

    let className = 'card flip-card';
    if (props.matched) {
        className = className + ' matched';
    }
    const classNameActive = className + ' active';

    return (
        <div
            onClick={() => {
                if (!props.matched && !props.imageUp) {
                    props.onClick(props.id);
                }
            }}
            className={props.imageUp ? classNameActive : className}
        >
            <div className="flip_card_inner">
                <div className="flip_card_front">
                    <img src={`${backPath}`} draggable='false' alt='' />
                </div>
                <div className="flip_card_back">
                    <img src={`${imPath}`} draggable='false' alt='' />
                </div>
            </div>
        </div>
    );
};

export default CardView;