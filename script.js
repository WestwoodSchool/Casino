// Game Variables
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;

// Initialize the Game
function initializeGame() {
    createDeck();
    shuffleDeck();

    playerCards = [deck.pop(), deck.pop()];
    dealerCards = [deck.pop(), deck.pop()];

    updateUI();
    checkInitialBlackjack();
}

// Create a Deck
function createDeck() {
    deck = [];
    suits.forEach((suit) => {
        values.forEach((value) => {
            deck.push({ suit, value });
        });
    });
}

// Shuffle the Deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Get Card Image URL
function getCardImage(card) {
    const suitMap = {
        hearts: 'H',
        diamonds: 'D',
        clubs: 'C',
        spades: 'S',
    };
    const valueMap = {
        J: '11',
        Q: '12',
        K: '13',
        A: '1',
    };

    const suitChar = suitMap[card.suit];
    const valueChar = valueMap[card.value] || card.value;

    return `https://acbl.mybigcommerce.com/product_images/uploaded_images/${valueChar}${suitChar}.png`;
}

// Calculate Score
function calculateScore(cards) {
    let score = 0;
    let aces = 0;

    cards.forEach((card) => {
        if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else if (card.value === 'A') {
            aces += 1;
            score += 11;
        } else {
            score += parseInt(card.value);
        }
    });

    while (score > 21 && aces > 0) {
        score -= 10;
        aces -= 1;
    }

    return score;
}

// Update UI
function updateUI() {
    const playerCardsDiv = document.getElementById('player-cards');
    const dealerCardsDiv = document.getElementById('dealer-cards');
    const playerScoreSpan = document.getElementById('player-score');
    const dealerScoreSpan = document.getElementById('dealer-score');

    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';

    playerCards.forEach((card) => {
        const img = document.createElement('img');
        img.src = getCardImage(card);
        playerCardsDiv.appendChild(img);
    });

    dealerCards.forEach((card) => {
        const img = document.createElement('img');
        img.src = getCardImage(card);
        dealerCardsDiv.appendChild(img);
    });

    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);

    playerScoreSpan.textContent = playerScore;
    dealerScoreSpan.textContent = dealerScore;
}

// Check Initial Blackjack
function checkInitialBlackjack() {
    if (playerScore === 21) {
        document.getElementById('result-message').textContent = 'Blackjack! You Win!';
        document.getElementById('message').style.display = 'block';
    } else if (dealerScore === 21) {
        document.getElementById('result-message').textContent = 'Dealer has Blackjack! You Lose!';
        document.getElementById('message').style.display = 'block';
    }
}

// Hit Action
function hit() {
    playerCards.push(deck.pop());
    updateUI();

    if (playerScore > 21) {
        document.getElementById('result-message').textContent = 'You Bust! Dealer Wins!';
        document.getElementById('message').style.display = 'block';
    }
}

// Stand Action
function stand() {
    while (dealerScore < 17) {
        dealerCards.push(deck.pop());
        updateUI();
    }

    if (dealerScore > 21) {
        document.getElementById('result-message').textContent = 'Dealer Busts! You Win!';
    } else if (playerScore > dealerScore) {
        document.getElementById('result-message').textContent = 'You Win!';
    } else if (playerScore < dealerScore) {
        document.getElementById('result-message').textContent = 'Dealer Wins!';
    } else {
        document.getElementById('result-message').textContent = 'It\'s a Tie!';
    }

    document.getElementById('message').style.display = 'block';
}

// Restart Game
function restartGame() {
    document.getElementById('message').style.display = 'none';
    initializeGame();
}

// Event Listeners
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);
document.getElementById('restart-button').addEventListener('click', restartGame);

// Start the Game
initializeGame();
