// DOM Elements
const introContainer = document.getElementById('intro-container');
const introVideo = document.getElementById('intro-video');
const introOverlay = document.getElementById('intro-overlay');
const startButton = document.getElementById('start-button');
const blackjackContainer = document.getElementById('blackjack-container');
const dealerCardsZone = document.getElementById('dealer-cards');
const playerCardsZone = document.getElementById('player-cards');
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');

// Card images for dealer and player (replace or expand this list for more cards)
const cardImages = [
    "image (1).png",
    "image (2).png",
    "image (3).png",
    "Screenshot 2025-01-07 222316.png"
];

// Event: Video Ends
introVideo.addEventListener('timeupdate', () => {
    const timeRemaining = introVideo.duration - introVideo.currentTime;
    if (timeRemaining <= 1) {
        introVideo.style.filter = 'blur(10px)'; // Add blur effect during the last second
    }
});

introVideo.addEventListener('ended', () => {
    introOverlay.style.display = 'flex'; // Show the "Enter" button overlay
});

// Event: Enter Button Click
startButton.addEventListener('click', () => {
    introContainer.style.display = 'none'; // Hide intro section
    blackjackContainer.style.display = 'flex'; // Show blackjack table
});

// Event: Deal Button Click
dealButton.addEventListener('click', () => {
    resetTable(); // Reset the table for a new game
    dealInitialCards(); // Deal initial cards to the dealer and player
});

// Event: Hit Button Click
hitButton.addEventListener('click', () => {
    dealCard(playerCardsZone); // Add a new card to the player's hand
});

// Event: Stand Button Click
standButton.addEventListener('click', () => {
    dealerPlay(); // Dealer's turn
    determineWinner(); // Determine the winner
});

// Function to reset the table
function resetTable() {
    dealerCardsZone.innerHTML = ''; // Clear dealer's cards
    playerCardsZone.innerHTML = ''; // Clear player's cards
}

// Function to deal initial cards
function dealInitialCards() {
    // Deal two cards to the dealer
    dealCard(dealerCardsZone);
    dealCard(dealerCardsZone);

    // Deal two cards to the player
    dealCard(playerCardsZone);
    dealCard(playerCardsZone);
}

// Function to deal a card to a specific zone
function dealCard(targetZone) {
    const randomIndex = Math.floor(Math.random() * cardImages.length); // Random card
    const card = document.createElement('img'); // Create card element
    card.src = cardImages[randomIndex];
    card.alt = "Card";
    card.classList.add('card'); // Add the card class for styling
    targetZone.appendChild(card); // Add card to the specified zone
}

// Function for the dealer's turn
function dealerPlay() {
    while (dealerCardsZone.children.length < 5) {
        // Simple logic: Dealer keeps hitting until they have 5 cards
        dealCard(dealerCardsZone);
    }
}

// Function to determine the winner (placeholder logic)
function determineWinner() {
    alert("Game Over! Winner determination logic goes here.");
    // Add blackjack scoring logic here to compare dealer and player hands
}
