// Game Engine Skeleton

// Global Variables
let deck = [];       // Array to represent the deck of cards
let hand = [];       // Array to represent the player's hand
let submittedHand = []; // Array to represent the submitted hand
let round = 1;       // Current round number
let cardsLeft = 52;  // Total cards left in the deck (52 by default)

// Function to initialize the game
function GameSetup() {
    console.log("Setting up the game...");
    // Initialize or shuffle the deck
    deck = initializeDeck();
    shuffleDeck(deck);
    
    // Draw the initial hand
    DrawCards();
    
    // Set initial round or game state
    round = 1;
    cardsLeft = deck.length;
    
    console.log("Game setup complete!");
}

// Function to draw the first 8 cards of the game
function DrawCards() {
    console.log("Drawing the first 8 cards...");
    for (let i = 0; i < 8; i++) {
        if (deck.length > 0) {
            hand.push(deck.pop()); // Draw from the top of the deck
        } else {
            console.log("Deck is empty!");
            break;
        }
    }
    console.log("Initial hand:", hand);
}

// Function to replace cards in the hand
function ReplaceHand(selectedCards) {
    console.log("Replacing cards...");
    // Remove selected cards from the hand
    selectedCards.forEach(card => {
        const index = hand.indexOf(card);
        if (index > -1) {
            hand.splice(index, 1); // Remove the card
        }
    });
    
    // Refill the hand to 8 cards
    while (hand.length < 8 && deck.length > 0) {
        hand.push(deck.pop());
    }
    
    console.log("New hand:", hand);
}

// Function to start the next round
function NextRound() {
    console.log("Starting the next round...");
    // Increment the round counter
    round++;
    
    // Reset or modify round-specific settings as needed
    submittedHand = [];
    
    // Ensure hand is refilled
    ReplaceHand([]);
    
    console.log("Round", round, "has started!");
}

// Helper function to initialize a deck (e.g., 52 cards)
function initializeDeck() {
    const suits = ["h", "d", "c", "s"]; // Hearts, Diamonds, Clubs, Spades
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"];
    const deck = [];
    
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ rank, suit });
        }
    }
    return deck;
}

// Helper function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log("Deck shuffled.");
}

// Initialize the game when the script is loaded
GameSetup();