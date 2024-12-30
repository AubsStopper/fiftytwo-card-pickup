const container = document.getElementById('card-container');
const startBtn = document.getElementById('start-btn');

// Card suits and values
const suits = ['♥', '♦', '♣', '♠'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Define columns for suits
const suitColumns = {
    '♥': window.innerWidth * 0.2,
    '♦': window.innerWidth * 0.4,
    '♣': window.innerWidth * 0.6,
    '♠': window.innerWidth * 0.8,
};

let pickedCards = {
    '♥': 0,
    '♦': 0,
    '♣': 0,
    '♠': 0,
};

// Generate all 52 cards
function generateDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

// Create a single card element
function createCard(cardData, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.innerText = `${cardData.value}${cardData.suit}`;
    if (cardData.suit === '♥' || cardData.suit === '♦') {
        cardFront.classList.add('red');
    } else {
        cardFront.classList.add('black');
    }
    
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.innerText = 'Solitaire';
    
    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    card.appendChild(cardInner);

    container.appendChild(card);

    // Randomize initial position (above screen)
    card.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
    card.style.top = `-100px`;

    setTimeout(() => {
        card.classList.add('flip'); // Flip the card

        const finalY = Math.min(
            Math.random() * window.innerHeight * 0.8,
            window.innerHeight - 100
        );

        card.style.transform = `translateY(${finalY}px) rotate(${Math.random() * 360}deg)`;
        card.style.transition = `transform 3s ease-out`;
    }, index * 200);

    // Add click event listener
    card.addEventListener('click', () => sortCardToBottom(card, cardData));
}

// Move the clicked card to its suit column at the bottom
function sortCardToBottom(card, cardData) {
    const columnX = suitColumns[cardData.suit] - 30; // Adjust for card width
    const rowY = window.innerHeight - 100 - (pickedCards[cardData.suit] * 20); // Stack cards with offset

    card.style.transition = 'transform 1s ease-in-out';
    card.style.transform = `translate(${columnX - card.offsetLeft}px, ${rowY - card.offsetTop}px)`;
    card.style.zIndex = 1000 + pickedCards[cardData.suit]; // Ensure cards stack properly

    pickedCards[cardData.suit] += 1;
}

// Start the cascade effect
function startCascade() {
    container.innerHTML = ''; // Clear previous cards
    pickedCards = { '♥': 0, '♦': 0, '♣': 0, '♠': 0 }; // Reset stack counters
    const deck = generateDeck();
    deck.forEach((card, index) => createCard(card, index));
}

// Start cascade on button click
startBtn.addEventListener('click', startCascade);


