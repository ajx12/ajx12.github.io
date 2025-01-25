// Game Engine Skeleton

// Global Variables
let deck = [];       // Array to represent the deck of cards
let hand = [];       // Array to represent the player's hand#
//let handHtmlObjects = []; // Array to represent the html objects of the hand
let selectedCards = []; // Array to represent the submitted hand
//let submittedHandHtmlObjects = []; // Array to represent the html objects of the submitted hand
let round = 1;       // Current round number
let cardsLeft = 52;  // Total cards left in the deck (52 by default)

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
        let currCardPath = currCard.pngPath; // Get the path to the image of the card
        let currCardHtmlObject = document.getElementById(`hand-card-${i+1}`); //Grab the HTML object of the card 

        let currCardImage = document.createElement('img'); //create the image element to be placed in the current card HTML object
        currCardImage.src = '/cards/'.concat(currCardPath); // Add the card directory to the path.
        console.log("Image source is ", currCardPath);
        currCardImage.alt = currCardPath; // add the alt so if image can't be fetched, it tells you the value

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
    selectedCards = [];
    
    // Ensure hand is refilled
    ReplaceHand([]);
    
    console.log("Round", round, "has started!");
}

// Helper function to initialize a deck (e.g., 52 cards)
function initializeDeck() {
    const suits = ["h", "d", "c", "s"]; // Hearts, Diamonds, Clubs, Spades
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"];
    const deck = [];
    let cardID = 0;
    
    for (const suit of suits) {
        for (const rank of ranks) {
            let pngPath = (rank.concat(suit)).concat(".png");
            deck.push({ pngPath, rank, suit, cardID });
            console.log(deck[cardID]);
            cardID++;
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

function roundGameplayLoop(){
    console.log("Round Started");

    

}


// Add Event Listeners for Cards in the Hand
function setupHandListeners() {
    for (let i = 1; i <= 8; i++) {
        const handCard = document.getElementById(`hand-card-${i}`);
        handCard.addEventListener('click', () => selectCard(i));
    }
}

// Add Event Listeners for Selected Cards (Submitted Hand)
function setupSelectedListeners() {
    for (let i = 1; i <= 5; i++) {
        const selectedCard = document.getElementById(`selected-card-${i}`);
        selectedCard.addEventListener('click', () => deselectCard(i));
    }
}

// Add Event Listener for Submit & discard buttons
function setupButtonListeners() {
    const submitButton = document.getElementById(`submit-button`);
    submitButton.addEventListener('click', () => submitHand());

    const discardButton = document.getElementById(`discard-button`);
    discardButton.addEventListener('click', () => discardHand());
}

function submitHand(){
    let handType = checkSubmittedHandType();
    console.log("The handType is: ", handType);
    return 0;
}


function checkSubmittedHandType(){
    let possibleHandTypes = ["Straight Flush", "Four of a Kind", "Full house", "Flush", "Straight", "Three of a Kind", "Two Pair", "Pair", "High Card"]
    let StraightFlush = false;
    let Flush = false;
    let Straight = false;
    let FourOfAKind = false;
    let ThreeOfAKind = false;
    let FullHouse = false;
    let TwoPair = false;
    let Pair = false;
    let HighCard = true;
    let straightCounter = [];
    //check for Straight Flush
    if (selectedCards.length == 5 && possibleHandTypes.includes("Straight Flush") == true){
        StraightFlush = true;
        let suitToCheck = selectedCards[0].suit;
        Flush = true;
        Straight = true;
        for (let i = 0; i < 5; i++){
            let currCardRank = selectedCards[i].rank;
            console.log(currCardRank);
            if (currCardRank == 'j'){
                straightCounter.push(11);
            }else if (currCardRank == 'q'){
                straightCounter.push(12)
            }else if (currCardRank == 'k'){
                straightCounter.push(13)
            }else if (currCardRank == 'a'){
                straightCounter.push(14);
            }
            else{
                straightCounter.push(parseInt(currCardRank, 10));
            }


            if (selectedCards[i].suit != suitToCheck){ //if the suit doesn't match the first card then flush is false
                StraightFlush = false;
                Flush = false;
                sfIndex = possibleHandTypes.indexOf("Straight Flush"); // get the index of Straight Flush to remove
                possibleHandTypes.splice(sfIndex, 1); // remove (splice) it from the array
                fIndex = possibleHandTypes.indexOf("Flush"); // get the index of Flush to remove
                possibleHandTypes.splice(fIndex, 1); // remove it from the array
            }

        }
        if (Straight == true){
            //Bubble sort the hand for order value
            for (let i = 0; i < 5; i++){
                let currentLowest = straightCounter[i];
                let lowestIndex = i;
                for (let j = i; j < 5; j++){
                    if (currentLowest > straightCounter[j]){
                        currentLowest = straightCounter[j];
                        lowestIndex = j;
                    }
                }
                if (straightCounter[i] != currentLowest){
                    let temp = straightCounter[lowestIndex];
                    straightCounter[lowestIndex] = straightCounter[i];
                    straightCounter[i] = temp;
                }
            }
            console.log("Sorted list of submitted hand is: ", straightCounter);

            for (let i = 0; i < 4; i++){
                let currentValue = straightCounter[i];
                let nextValue = straightCounter[i+1];

                if (i==3 && nextValue == 14){
                    if (Straight == true && currentValue == 5){
                        Straight = true;
                        console.log("Straight confirmed with Ace.");
                    }
                }
                else{
                    if (currentValue + 1 != nextValue){
                        console.log("Straight unavailable as value ", straightCounter[i], " and value ", straightCounter[i+1], " are too far apart.");
                        i = 5;
                        Straight = false;
                        StraightFlush = false;
                        let sIndex = possibleHandTypes.indexOf("Straight");
                        possibleHandTypes.splice(sIndex,1);
                        let sfIndex = possibleHandTypes.indexOf("Straight Flush"); // get the index of Straight Flush to remove
                        possibleHandTypes.splice(sfIndex, 1); // remove (splice) it from the array
                    }

                }
            }
            if (StraightFlush == true){
                return "Straight Flush";
            }
            if (Straight == true){
                return "Straight";
            }
            if (Flush == true){
                return "Flush";
            }
        }
        return "Not a StraightFlush, Straight, or Flush";
    }

    console.log("We get here.")
    //Now finished checking for Straight-Flush, Straights, and Flushes.
    
    return "High Card";

}

function discardHand(){

}



function selectCard(handIndex) {
    const handCard = document.getElementById(`hand-card-${handIndex}`);
    const cardImage = handCard.querySelector('img'); // Get the <img> inside the hand card

    // If no image or max selected cards reached, do nothing
    if (!cardImage || selectedCards.length >= 5) return;

    // Find the next empty slot in the selected cards
    const nextSlotIndex = selectedCards.length + 1; // 1-based index for submitted cards
    const selectedSlot = document.getElementById(`selected-card-${nextSlotIndex}`);

    // Move the card to the selected pile
    selectedCards.push(hand[handIndex-1]); //add to the selected cards array

    let newCardImage = cardImage.cloneNode(true); //copy the image from the hand card
    selectedSlot.innerHTML = ''; // clear any image from the selected slot card
    selectedSlot.appendChild(newCardImage); // add the image to the selected card slot
    console.log('Card selected from hand:', `hand-card-${handIndex}`);


    // Optionally disable the hand card to indicate it's been used
    handCard.style.pointerEvents = 'none';
    handCard.style.opacity = '.4';
}

function deselectCard(selectedIndex){
    let selectedSlot = document.getElementById(`selected-card-${selectedIndex}`);
    let cardImage = selectedSlot.querySelector('img');

    if (!cardImage) return;

    let deselectedCard = selectedCards[selectedIndex-1];
    let originalHandCard = hand.indexOf(deselectedCard); //gets the index of the card from the hand array
    let originalHandCardHTMLObject = document.getElementById(`hand-card-${originalHandCard+1}`);

    originalHandCardHTMLObject.style.pointerEvents = 'auto';
    originalHandCardHTMLObject.style.opacity = '1';

    selectedCards.splice(selectedIndex - 1, 1); // remove the card from the selected array

    selectedSlot.innerHTML = '';
    
    refillSelectedSlots();
    console.log('Card deselected from: ', `selected-card-${selectedIndex}`);

}


function refillSelectedSlots() {

    // Clear all selected slots
    for (let i = 1; i <= 5; i++) {
        const slot = document.getElementById(`selected-card-${i}`);
        slot.innerHTML = '';
    }

    // Re-add cards to the slots in order
    for (let i = 0; i < selectedCards.length; i++){
        let currCard = selectedCards[i]; //Grab the current new card
        let currCardPath = currCard.pngPath; // Get the path to the image of the card
        let currCardHtmlObject = document.getElementById(`selected-card-${i+1}`); //Grab the HTML object of the card 

        let currCardImage = document.createElement('img'); //create the image element to be placed in the current card HTML object
        currCardImage.src = '/cards/'.concat(currCardPath); // Add the card directory to the path.
        console.log("Image source is for selected card ", i, "is ", currCardPath);
        currCardImage.alt = currCardPath; // add the alt so if image can't be fetched, it tells you the value

        currCardHtmlObject.innerHTML = ''; // clear any previous card image
        currCardHtmlObject.appendChild(currCardImage); // Set the new card image to the HTML object

    }
}




// Initialize the game when the script is loaded
GameSetup();
setupHandListeners();
setupSelectedListeners();
setupButtonListeners();

roundGameplayLoop();
