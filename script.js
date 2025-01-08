// DOM Elements
const introContainer = document.getElementById('intro-container');
const introVideo = document.getElementById('intro-video');
const introOverlay = document.getElementById('intro-overlay');
const startButton = document.getElementById('start-button');
const homeContainer = document.getElementById('home-container');
const gameCards = document.querySelectorAll('.game-card');

// Add blur effect to the video during the last second
introVideo.addEventListener('timeupdate', () => {
    const timeRemaining = introVideo.duration - introVideo.currentTime;
    if (timeRemaining <= 1) {
        introVideo.style.filter = 'blur(10px)'; // Add blur effect
    }
});

// Show overlay and button when the video ends
introVideo.addEventListener('ended', () => {
    introOverlay.style.display = 'flex'; // Display overlay
});

// Handle "Enter" button click
startButton.addEventListener('click', () => {
    introContainer.style.display = 'none'; // Hide intro section
    homeContainer.style.display = 'flex'; // Show home page
});

// Add event listeners to game cards
gameCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const game = e.target.dataset.game; // Get the selected game from the button
        alert(`Navigating to ${game} game...`); // Placeholder for game navigation
        // To navigate to another page, uncomment the line below:
        // window.location.href = `${game}.html`;
    });
});
