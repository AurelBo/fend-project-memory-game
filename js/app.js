/*
 * Create a list that holds all of your cards
 */
const cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];


// Generate cards
/* const container = document.querySelector(".deck");

for (let i = 0; i < iconsOfCards.length; i++) {
    const createCards = document.createElement("li");
    createCards.classList.add("card");
    createCards.innerHTML = `<i class="fa ${iconsOfCards[i]}"></i>`;
    container.appendChild(createCards);
} */

/*****GENERATING THE GAME *****/

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

function initGame() {
    const deck = document.querySelector('.deck');
    const cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');
}

initGame();

/***** VARIABLES ******/

const deckOfCards = document.querySelectorAll(".card");

//keeping track of the game
let openedCards = [];
let matchedCards = [];

const moveCounter = document.querySelector(".moves");
let moves = 0;

const star1 = document.getElementById("first-star");
const star2 = document.getElementById("second-star");
const star3 = document.getElementById("third-star");
let starCounter = 3;

const resetButton = document.querySelector(".restart");


let timer = document.querySelector('.timer');
let minutes = 0;
let seconds = 0;

let newTime = false;

/****** FUNCTIONS *******/

// Do they match? 

function match() {
    openedCards[0].classList.add('match', 'open', 'show')
    openedCards[1].classList.add('match', 'open', "show")
}

function noMatch() {
    setTimeout(function () {
        openedCards[0].classList.remove('match', 'open', 'show')
        openedCards[1].classList.remove('match', 'open', "show")

        openedCards = [];
    }, 500);
}

//move counter

function moveCount() {

    moves++
    moveCounter.innerText = moves;

    if(moves > 2 && moves < 5){
        star1.style.display = "none";
        starCounter = 2;
    } else if(moves > 5){
        star2.style.display = "none";
        starCounter = 1;
    };
}

function timeCount() {

    time = setInterval(function(){
        seconds++;
        if (seconds === 60){
            minutes++;
            seconds = 0
        };
        timer.innerHTML = minutes + ":" + seconds;
    }, 1000);
}

function gameOver() {
    if (matchedCards.length === 8) {
        alert("you win!");
    };
}

/* function resetTheGame() {

};

resetButton.addEventListener("click",function(e) {

}; */



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 // Opening and comparing cards

 deckOfCards.forEach(function(card) {
     card.addEventListener('click',function(e) {
         if(newTime === false){
             newTime = true; 
             timeCount();
         }
      
         if (!card.classList.contains('open') && !card.classList.contains('show')) {
            openedCards.push(card);
             card.classList.add("open", "show");

             if (openedCards.length > 2){
                 card.classList.remove("open", "show");
             }
             
             if (openedCards.length == 2) {
                 moveCount()
                // If they match... 
                 if (openedCards[0].dataset.card == openedCards[1].dataset.card) {
                     match();
                     matchedCards.push(card);
                     openedCards = [];
                     gameOver();           
                   //if they don't match...
                 } else {
                   noMatch();
                 };
             }
        }
     });
 });