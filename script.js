// DOM Elements
const introContainer = document.getElementById('intro-container');
const introVideo = document.getElementById('intro-video');
const introOverlay = document.getElementById('intro-overlay');
const startButton = document.getElementById('start-button');
const homeContainer = document.getElementById('home-container');
const gameCards = document.querySelectorAll('.game-card');

// Event: Video Ends
introVideo.addEventListener('ended', () => {
    // Display the overlay with the "Enter" button
    introOverlay.style.display = 'flex';
});

// Event: Enter Button Click
startButton.addEventListener('click', () => {
    // Hide the intro section
    introContainer.style.display = 'none';
    // Show the home page
    homeContainer.style.display = 'flex';
});

// Event: Game Card Click
gameCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const game = e.target.dataset.game; // Get the game type from the button
        alert(`Navigating to ${game} game...`); // Placeholder for game navigation
        // Replace the alert with actual navigation logic or a page load for the game
        // Example: window.location.href = `${game}.html`;
    });
});
