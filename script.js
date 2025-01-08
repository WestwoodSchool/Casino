// Full Card Image Mapping from the ACBL site
const cardImages = {
    '2H': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/2H.png',
    '3H': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/3H.png',
    '4H': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/4H.png',
    '5H': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/5H.png',
    '6H': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/6H.png',
    '7H': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/7H.png',
    '8H': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/8H.png',
    '9H': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/9H.png',
    '10H': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/10H.png',
    'JH': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/11H.png',
    'QH': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/12H.png',
    'KH': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/13H.png',
    'AH': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/1H.png',
    '2D': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/2D.png',
    '3D': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/3D.png',
    '4D': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/4D.png',
    '5D': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/5D.png',
    '6D': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/6D.png',
    '7D': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/7D.png',
    '8D': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/8D.png',
    '9D': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/9D.png',
    '10D': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/10D.png',
    'JD': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/11D.png',
    'QD': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/12D.png',
    'KD': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/13D.png',
    'AD': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/1D.png',
    '2C': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/2C.png',
    '3C': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/3C.png',
    '4C': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/4C.png',
    '5C': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/5C.png',
    '6C': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/6C.png',
    '7C': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/7C.png',
    '8C': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/8C.png',
    '9C': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/9C.png',
    '10C': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/10C.png',
    'JC': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/11C.png',
    'QC': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/12C.png',
    'KC': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/13C.png',
    'AC': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/1C.png',
    '2S': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/2S.png',
    '3S': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/3S.png',
    '4S': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/4S.png',
    '5S': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/5S.png',
    '6S': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/6S.png',
    '7S': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/7S.png',
    '8S': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/8S.png',
    '9S': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/9S.png',
    '10S': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/10S.png',
    'JS': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/11S.png',
    'QS': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/12S.png',
    'KS': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/13S.png',
    'AS': 'https://acbl.mybigcommerce.com/product_images/uploaded_images/1S.png',
};

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
    createDeck();
    shuffleDeck();
    updateUI();
    dealInitialCards();
}

// Create a Deck
function createDeck() {
    const suits = ['H', 'D', 'C', 'S'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push(value + suit);
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
    img.src = cardImages[card];
    document.getElementById(area).appendChild(img);
}

// Calculate Score
function calculateScore(cards) {
    let score = 0;
    let aces = 0;

    cards.forEach(card => {
        const value = card.slice(0, -1); // Remove suit to get value
        if (['J', 'Q', 'K'].includes(value)) {
            score += 10;
        } else if (value === 'A') {
            aces += 1;
            score += 11;
        } else {
            score += parseInt(value);
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
        img.src = cardImages[card];
        playerCardsEl.appendChild(img);
    });

    dealerCards.forEach(card => {
        const img = document.createElement('img');
        img.src = cardImages[card];
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

// End Game
function endGame(message) {
    resultMessageEl.querySelector('h2').textContent = message;
    resultMessageEl.style.display = 'block';

    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
}

// Restart Game
function restartGame() {
    resultMessageEl.style.display = 'none';
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;

    initializeGame();
}

// Event Listeners
document.getElementById('deal-button').addEventListener('click', restartGame);
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);

// Initialize the game on page load
initializeGame();
