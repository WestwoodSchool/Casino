// Game Variables
let deck = [];
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let bank = 900;
let currentBet = 100;

// DOM Elements
const playerBankEl = document.getElementById('player-bank');
const currentBetEl = document.getElementById('current-bet');
const playerCardsEl = document.getElementById('player-cards');
const dealerCardsEl = document.getElementById('dealer-cards');
const playerScoreEl = document.getElementById('player-score');
const dealerScoreEl = document.getElementById('dealer-score');
const resultMessageEl = document.getElementById('result-message');

// Initialize Game
function initializeGame() {
    playerCards = [];
    dealerCards = [];
    deck = createDeck();
    shuffleDeck();
    updateUI();
    dealInitialCards();
}

// Create a Deck
function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value });
        });
    });
    return deck;
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

// Deal Initial Cards
function dealInitialCards() {
    playerCards.push(deck.pop(), deck.pop());
    dealerCards.push(deck.pop(), deck.pop());
    updateUI();

    // Check for Blackjack
    if (calculateScore(playerCards) === 21) {
        endGame('Blackjack! You Win!');
    } else if (calculateScore(dealerCards) === 21) {
        endGame('Dealer has Blackjack! You Lose!');
    }
}

// Deal a Card
function dealCard(hand, area) {
    const card = deck.pop();
    hand.push(card);

    const img = document.createElement('img');
    img.src = getCardImage(card);
    document.getElementById(area).appendChild(img);
}

// Calculate Score
function calculateScore(cards) {
    let score = 0;
    let aces = 0;

    cards.forEach(card => {
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

// Update the UI
function updateUI() {
    playerCardsEl.innerHTML = '';
    dealerCardsEl.innerHTML = '';

    playerCards.forEach(card => {
        const img = document.createElement('img');
        img.src = getCardImage(card);
        playerCardsEl.appendChild(img);
    });

    dealerCards.forEach(card => {
        const img = document.createElement('img');
        img.src = getCardImage(card);
        dealerCardsEl.appendChild(img);
    });

    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);

    playerScoreEl.textContent = playerScore;
    dealerScoreEl.textContent = dealerScore;

    playerBankEl.textContent = `$${bank}`;
    currentBetEl.textContent = `$${currentBet}`;
}

// Player Hits
function hit() {
    dealCard(playerCards, 'player-cards');
    updateUI();

    if (playerScore > 21) {
        endGame('You Bust! Dealer Wins!');
    }
}

// Player Stands
function stand() {
    while (dealerScore < 17) {
        dealCard(dealerCards, 'dealer-cards');
        updateUI();
    }

    if (dealerScore > 21) {
        endGame('Dealer Busts! You Win!');
    } else if (playerScore > dealerScore) {
        endGame('You Win!');
    } else if (playerScore < dealerScore) {
        endGame('Dealer Wins!');
    } else {
        endGame('It\'s a Tie!');
    }
}

// Double Down
function doubleDown() {
    if (bank >= currentBet) {
        bank -= currentBet;
        currentBet *= 2;
        hit();

        if (playerScore <= 21) {
            stand();
        }
    } else {
        alert('Not enough money to double down!');
    }
}

// End Game
function endGame(message) {
    resultMessageEl.querySelector('h2').textContent = message;
    resultMessageEl.style.display = 'block';

    // Disable buttons
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    document.getElementById('double-button').disabled = true;
}

// Restart Game
function restartGame() {
    bank += currentBet; // Reset the bet
    currentBet = 100;

    resultMessageEl.style.display = 'none';
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
    document.getElementById('double-button').disabled = false;

    initializeGame();
}

// Event Listeners
document.getElementById('deal-button').addEventListener('click', restartGame);
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);
document.getElementById('double-button').addEventListener('click', doubleDown);

// Initialize the game on page load
initializeGame();
