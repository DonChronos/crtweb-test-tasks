export function generateCardSet() {
    const cards = [];
    let id = 1;
    for (let i = 1; i <= 18; i++) {
        const card1 = {
            id: id,
            image: i,
            imageUp: false,
            matched: false
        };
        id++;
        const card2 = {
            id: id,
            image: i,
            imageUp: false,
            matched: false
        };
        cards.push(card1);
        cards.push(card2);
        id++;
    }

    return cards;
};

export function getCard(id, cards) {
	console.log(id);
	console.log(cards);
    return cards.find(c => c.id === id)
}

export function cardsHaveIdenticalImages(id1, id2, cards) {
    if (getCard(id1, cards).image === getCard(id2, cards).image) {
        return true;
    } else {
        return false;
    }
}

export function getAllIndexes(cards, id1, id2) {
	let indexes = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].id === id1 || cards[i].id === id2) indexes.push(i);
	}
	return indexes;
}