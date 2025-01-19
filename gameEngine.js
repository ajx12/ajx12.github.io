// Game Engine Skeleton

// Global Variables
let deck = [];       // Array to represent the deck of cards
let hand = [];       // Array to represent the player's hand#
let handHtmlObjects = []; // Array to represent the html objects of the hand
let submittedHand = []; // Array to represent the submitted hand
let submittedHandHtmlObjects = []; // Array to represent the html objects of the submitted hand
let round = 1;       // Current round number
let cardsLeft = 52;  // Total cards left in the deck (52 by default)

let handcard1 = document.getElementById('hand-card-1');
handHtmlObjects.push(handcard1);
let handcard2 = document.getElementById('hand-card-2');
handHtmlObjects.push(handcard2);
let handcard3 = document.getElementById('hand-card-3');
handHtmlObjects.push(handcard3);
let handcard4 = document.getElementById('hand-card-4'); // Retrieves the hand card objects from the html doc
handHtmlObjects.push(handcard4); // Add each handcard html object to the array for easy reference.
let handcard5 = document.getElementById('hand-card-5');
handHtmlObjects.push(handcard5);
let handcard6 = document.getElementById('hand-card-6');
handHtmlObjects.push(handcard6);
let handcard7 = document.getElementById('hand-card-7');
handHtmlObjects.push(handcard7);
let handcard8 = document.getElementById('hand-card-8');
handHtmlObjects.push(handcard8);


let submittedcard1 = document.getElementById('submitted-card-1');
submittedHandHtmlObjects.push(submittedcard1);
let submittedcard2 = document.getElementById('submitted-card-2');
submittedHandHtmlObjects.push(submittedcard2);
let submittedcard3 = document.getElementById('submitted-card-3');  // Retrieves the submitted card objects from the html doc
submittedHandHtmlObjects.push(submittedcard3);
let submittedcard4 = document.getElementById('submitted-card-4');
submittedHandHtmlObjects.push(submittedcard4);
let submittedcard5 = document.getElementById('submitted-card-5');
submittedHandHtmlObjects.push(submittedcard5);

let jokercard1 = document.getElementById('joker-card-1');
let jokercard2 = document.getElementById('joker-card-2');
let jokercard3 = document.getElementById('joker-card-3');  // Retrieves the joker card objects from the html doc
let jokercard4 = document.getElementById('joker-card-4'); 



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

        let currCard = hand[i]; //Grab the current new card
        let currCardPath = currCard[0]; // Get the path to the image of the card
        let currCardHtmlObject = handHtmlObjects[i]; //Grab the HTML object of the card 

        let currCardImage = document.createElement('img'); //create the image element to be placed in the current card HTML object
        currCardImage.src = '/cards/'.concat(currCardPath); // Add the card directory to the path.
        console.log("Image source is ", currCardImage.src);
        currCardImage.alt = currCardPath; // add the alt so when you hover over, it tells you the value

        currCardHtmlObject.innerHTML = ''; // clear any previous card image
        currCardHtmlObject.appendChild(currCardImage); // Set the new card image to the HTML object
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
            let pngPath = (rank.concat(suit)).concat(".png");
            deck.push({ pngPath, rank, suit });
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