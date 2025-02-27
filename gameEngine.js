// Game Engine Skeleton

// Global Variables
let deck = [];       // Array to represent the deck of cards
let hand = [];       // Array to represent the player's hand
let handValues = [];
//let handHtmlObjects = []; // Array to represent the html objects of the hand
let selectedCards = []; // Array to represent the submitted hand
//let submittedHandHtmlObjects = []; // Array to represent the html objects of the submitted hand
let round = 1;       // Current round number
let cardsLeft = 52;  // Total cards left in the deck (52 by default)
let submitsLeft = 4;
let discardsLeft = 3;
let targetScore = 300;
let currentScore = 0;

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
    handValues = initializeHandScores();
    scoreRequiredLabel = document.getElementById("score-required");
    scoreRequiredLabel.textContent = targetScore;
    currentScoreLabel = document.getElementById("current-score");
    currentScoreLabel.textContent = currentScore;
    
    // Draw the initial hand
    DrawCards();
    
    // Set initial round or game state
    round = 1;
    cardsLeft = deck.length;
    
    console.log("Game setup complete!");
}

function setHandCardImages(){
    for (let i = 0; i < 8; i++){
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
    setHandCardImages();
    console.log("Initial hand:", hand);
}

// Function to replace cards in the hand
function ReplaceHand(toReplace) {
    console.log("Replacing cards...");
    // Remove selected cards from the hand
    toReplace.forEach(card => {
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
    submitsLeft = 4;
    discardsLeft = 3;
    targetScore = targetScore + 150;
    
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

function initializeHandScores(){
    let valuesArray = [];
    let possibleHandTypes = ["Straight Flush", "Four of a Kind", "Full House", "Flush", "Straight", "Three of a Kind", "Two Pair", "Pair", "High Card"];
    let possibleHandTypesCredits = [100, 60, 40, 35, 30, 30, 20, 10, 5];
    let possibleHandTypesMults = [8, 7, 4, 4, 4, 3, 2, 2, 1];
    for (let i = 0; i < possibleHandTypes.length; i++){
        let type = possibleHandTypes[i];
        let typeCred = possibleHandTypesCredits[i];
        let typeMult = possibleHandTypesMults[i];
        valuesArray.push({type, typeCred, typeMult});
    }
    return valuesArray;
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
    let handTypeTuple = checkSubmittedHandType();
    console.log("The handType is: ", handTypeTuple);
    let handType = handTypeTuple.handType;

    const creditsLabel = document.getElementById("credits");
    const multiplierLabel = document.getElementById("multiplier"); // credits multiplier total-score labels to set to their numeric values
    const totalScoreLabel = document.getElementById("total-score");
    for (let i = 0; i < handValues.length; i++){
        if (handValues[i].type == handType){
            let typeCred = handValues[i].typeCred + handTypeTuple.value;
            creditsLabel.textContent = typeCred;
            let typeMult = handValues[i].typeMult;
            multiplierLabel.textContent = typeMult;
            let totalHandScore = typeCred * typeMult;
            totalScoreLabel.textContent = totalHandScore;
            currentScore = currentScore + totalHandScore;
        }
    }
    submitsLeft = submitsLeft - 1;
    let submitsLeftLabel = document.getElementById("submits-left");
    submitsLeftLabel.textContent = submitsLeft;
    let currentScoreLabel = document.getElementById("current-score");
    currentScoreLabel.textContent = currentScore;

    // now lets reset the hand and available hand:
    let cardsToBeRemovedFromHand = [];
    for (let i = 1; i < (selectedCards.length + 1); i++){
        let currentSubmittedHandObject = document.getElementById(`selected-card-${i}`);
        currentSubmittedHandObject.innerHTML = ''; // clear any image from the card slot
        submittedCardIndexInHand = hand.indexOf(selectedCards[i-1]);
        cardsToBeRemovedFromHand.push(selectedCards[i-1]);
        inHandCardObject = document.getElementById(`hand-card-${submittedCardIndexInHand+1}`);
        inHandCardObject.innerHTML = ''; // clear any image from the in hand card slot too
        inHandCardObject.style.pointerEvents = 'auto';
        inHandCardObject.style.opacity = '1';
    }
    
    while (selectedCards.length > 0){
        selectedCards.pop();
        console.log("Array of hand indexes to remove is: ", cardsToBeRemovedFromHand);
        submittedCardIndexInHand = hand.indexOf(cardsToBeRemovedFromHand[cardsToBeRemovedFromHand.length-1]);
        //hand.splice(cardsToBeRemovedFromHand[cardsToBeRemovedFromHand.length-1], 1);
        hand.splice(submittedCardIndexInHand, 1);
        cardsToBeRemovedFromHand.pop();
    }
    console.log("Before pushing back on hand, the size of the hand is: ", hand.length);
    while (hand.length < 8){
        if (deck.length != 0){
            console.log("Adding card to hand from deck:", hand.push(deck.pop()));
        }
    }
    console.log(hand);
    console.log(selectedCards);
    setHandCardImages();
    
    
    return 0;
}

function sortLowestToHighest(theList){
    for (let i = 0; i < theList.length; i++){
        let currentLowest = theList[i];
        let lowestIndex = i;
        for (let j = i; j < 5; j++){
            if (currentLowest > theList[j]){
                currentLowest = theList[j];
                lowestIndex = j;
            }
        }
        if (theList[i] != currentLowest){
            let temp = theList[lowestIndex];
            theList[lowestIndex] = theList[i];
            theList[i] = temp;
        }
    }
    console.log("Finished sorting the list from lowest to highest");
    return theList;

}

function convertSelectedHandToInt(){
    let theList = [];
    for (let i = 0; i < selectedCards.length; i++){
        let currCardRank = selectedCards[i].rank;
        console.log("card is ", currCardRank);
        if (currCardRank == 'j'){
            theList.push(11);
        }else if (currCardRank == 'q'){
            theList.push(12);
        }else if (currCardRank == 'k'){
            theList.push(13);
        }else if (currCardRank == 'a'){
            theList.push(14);
        }
        else{
            theList.push(parseInt(currCardRank, 10));
        }
    }
    console.log("Finished converting hand to int");
    return theList;


}


function checkSubmittedHandType(){
    let possibleHandTypes = ["Straight Flush", "Four of a Kind", "Full House", "Flush", "Straight", "Three of a Kind", "Two Pair", "Pair", "High Card"]
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

    //Check for the submission of a single card:
    if (selectedCards.length == 1){
        let valuedCardlist = convertSelectedHandToInt();
        let value = valuedCardlist[0];
        let handType = "High Card"; 
        return {handType, value};
    }

    //check for Straight Flush
    if (selectedCards.length == 5 && possibleHandTypes.includes("Straight Flush") == true){
        StraightFlush = true;
        let suitToCheck = selectedCards[0].suit;
        Flush = true;
        Straight = true;
        straightCounter = convertSelectedHandToInt();
        for (let i = 0; i < 5; i++){
            if (selectedCards[i].suit != suitToCheck){ //if the suit doesn't match the first card then flush is false
                console.log("Not a flush");
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
            straightCounter = sortLowestToHighest(straightCounter);
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

            let value = 0;
            for (let i = 0; i < straightCounter.length; i++){
                value = value + straightCounter[i];
            }
            if (StraightFlush == true){
                let handType = "Straight Flush";
                return {handType, value};
            }
            if (Straight == true){
                let handType = "Straight";
                return {handType, value};
            }
            if (Flush == true){
                let handType = "Flush";
                return {handType, value};
            }
        }
    }

    //Now finished checking for Straight-Flush, Straights, and Flushes.

    // Now check for the rest of the hand types:
    let pairsList = [];
    let alreadyChecked = []; //a list to contain the already checked ranks, so you for 3Kind or 4Kind, you don't get 4,3,2 or 3,2 of the same rank in the pairsList
    let orderedList = convertSelectedHandToInt();
    orderedList = sortLowestToHighest(orderedList);
    console.log("Ordered List is: ", orderedList);
    for (let i = 0; i < orderedList.length; i++){
        let sameCardCount = 1;
        let rank = orderedList[i];
        let j = i+1;
        while (j < orderedList.length){
            if (rank == orderedList[j]){
                sameCardCount++;
            }
            j++;
        }
        if (sameCardCount > 1 && (alreadyChecked.includes(rank) == false)){
            alreadyChecked.push(rank);
            pairsList.push({rank, sameCardCount});
        }
    }
    console.log("The pairs list is: ", pairsList);
    let value = 0;
    for (let i = 0; i < pairsList.length; i++){
        value = value + (pairsList[i].rank * pairsList[i].sameCardCount);
    }
    if (pairsList.length != 0){
        let highestPairCount = 0
        let highestPairCountIndex = 0;
        for (let i = 0; i < pairsList.length; i++){
            let currentPairCount = pairsList[i].sameCardCount;
            if (highestPairCount < currentPairCount){
                highestPairCount = currentPairCount;
                highestPairCountIndex = i;
            }
        }

        if (highestPairCount == 3){
            if (pairsList.length > 1){
                let handType = "Full House";
                return {handType, value};
            }else{
                let handType = "Three of a Kind";
                return {handType, value};
            }
        }
        if (highestPairCount == 4){
            let handType = "Four of a Kind";
            return {handType, value};
        }
        if (highestPairCount == 2){
            if (pairsList.length > 1){
                let handType = "Two Pair";
                return {handType, value};
            }else{
                let handType = "Pair";
                return {handType, value};
            }
        }
    }

    
    let handType = "High Card";
    let valuedCardlist = convertSelectedHandToInt();
    for (let i = 0; i < valuedCardlist.length; i++){
        if (value < valuedCardlist[i]){
            value = valuedCardlist[i];
        }
    }
    // value will be 0, I need to be bothered to do this part, where there's a High Card with multiple cards played
    return {handType, value};



}

function discardHand(){
    return 0;

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
        //console.log("Image source is for selected card ", i, "is ", currCardPath);
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
