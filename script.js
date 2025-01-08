// DOM Elements
const introContainer = document.getElementById('intro-container');
const introVideo = document.getElementById('intro-video');
const introOverlay = document.getElementById('intro-overlay');
const startButton = document.getElementById('start-button');
const blackjackContainer = document.getElementById('blackjack-container');
const dealerCardsZone = document.getElementById('dealer-cards');
const playerCardsZone = document.getElementById('player-cards');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const dealButton = document.getElementById('deal-button');

// Card data for testing (you can replace this with dynamic card generation later)
const cardImages = [
    "image (1).png", // Example card
    "image (2).png",
    "image (3).png",
    "Screenshot 2025-01-07 222316.png"
];

// Event: Video Ends
introVideo.addEventListener('timeupdate', () => {
    const timeRemaining = introVideo.duration - introVideo.currentTime;
    if (timeRemaining <= 1) {
        introVideo.style.filter = 'blur(10px)'; // Add blur in the last second
    }
});

introVideo.addEventListener('ended', () => {
    introOverlay.style.display = 'flex'; // Show overlay with the "Enter" button
});

// Event: Enter Button Click
startButton.addEventListener('click', () => {
    introContainer.style.display = 'none'; // Hide intro section
    blackjackContainer.style.display = 'block'; // Show blackjack table
});

// Event: Deal Button Click
dealButton.addEventListener('click', () => {
    resetTable(); // Reset the table for a new round
    dealCards(); // Deal initial cards to the dealer and player
});

// Event: Hit Button Click
hitButton.addEventListener('click', () => {
    dealCard(playerCardsZone); // Give the player another card
});

// Event: Stand Button Click
standButton.addEventListener('click', () => {
    dealerPlay(); // Dealer plays their turn
    determineWinner(); // Determine the winner
});

// Function to reset the table
function resetTable() {
    dealerCardsZone.innerHTML = ''; // Clear dealer's cards
    playerCardsZone.innerHTML = ''; // Clear player's cards
}

// Function to deal initial cards
function dealCards() {
    // Deal 2 cards to the dealer
    dealCard(dealerCardsZone);
    dealCard(dealerCardsZone);

    // Deal 2 cards to the player
    dealCard(playerCardsZone);
    dealCard(playerCardsZone);
}

// Function to deal a card
function dealCard(targetZone) {
    const cardIndex = Math.floor(Math.random() * cardImages.length); // Get a random card
    const cardImg = document.createElement('img');
    cardImg.src = cardImages[cardIndex];
    cardImg.alt = "Card";
    cardImg.classList.add('card');
    targetZone.appendChild(cardImg); // Add the card to the target zone
}

// Function for the dealer's turn
function dealerPlay() {
    while (dealerCardsZone.children.length < 5) {
        // Dealer keeps hitting until 5 cards (basic logic)
        dealCard(dealerCardsZone);
    }
}

// Function to determine the winner (basic placeholder)
function determineWinner() {
    alert("Round Over! This is where you determine the winner.");
    // Add actual blackjack logic here to calculate the scores
}
