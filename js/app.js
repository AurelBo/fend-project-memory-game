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

/*****GENERATING THE GAME *****/

const deck = document.querySelector(".deck");

let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
}); 


function generateCard(card) {
  return `<li class="card"><i class="fa ${card}"></i></li>`;
}

function initGame() {
    deck.innerHTML = cardHTML.join('');
}
initGame();

/***** VARIABLES ******/

const deckOfCards = document.querySelectorAll(".card");
const shuffleCards = shuffle(cards);
const resetButton = document.getElementById("reset");

//keeping track of the game
let openedCards = [];
let matchedCards = [];
const moveCounter = document.querySelector(".moves");
let moves = 0;

const star1 = document.getElementById("first-star");
const star2 = document.getElementById("second-star");
const star3 = document.getElementById("third-star");
let starCounter = 3;



let timer = document.querySelector('.timer');
let minutes = 0;
let seconds = 0;

let newTime = false;

let reverse = false;

//modal
const modal = document.querySelector('.modal');
let starsModal = document.getElementById("stars-modal");
let movesModal = document.getElementById("moves-modal");
let timeModal = document.getElementById("time-modal");
let btnModal = document.getElementById("btn-modal");

/****** EVENT LISTENERS *****/

window.addEventListener("click", outsideClick);
resetButton.addEventListener("click", resetClick);
btnModal.addEventListener("click", resetModalClick);

/****** FUNCTIONS *******/

/* function newGame(){
    for (let i = 0; i < shuffleCards.length; i++) {
        const createCard = document.createElement("li");
        createCard.classList.add("card");
        createCard.innerHTML = `<i class="fa ${shuffleCards[i]}"/></li>`;
        deck.appendChild(createCard);
    }
}
newGame(); */


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
    if (moves <= 0){
        moves++
        moveCounter.innerText = moves + " move";
    } else {
        moves++
        moveCounter.innerText = moves + " moves";
    }
    

    if (moves <= 10){
        star3.style.visibility = "hidden";
        starCounter = 2;
    } else if(moves > 10 && moves <= 17){
        star2.style.visibility = "hidden";
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
        timer.innerHTML = doubleDigit(minutes) + ":" + doubleDigit(seconds);
    }, 1000);
    
}

function doubleDigit(digit) {
    if (digit < 10) {
        return "0" + digit;
    } else {
        return digit;
    }
}

//Modal

function isOver() {
    /* TODO:
     * Passer au reset
     * Styliser le bloc temps, moves etc... dans le css.
     */
    if (matchedCards.length === 8) {
        console.log("you win!");
        modal.style.display = "block";
        movesModal.innerText = `${moves}`;
        timeModal.innerText = doubleDigit(minutes) + ":" + doubleDigit(seconds) + " minutes";
        clearInterval(time);

        if(moves <= 10){
            starsModal.innerHTML = `<i class="fa fa-star"><i class="fa fa-star"><i class="fa fa-star">`;
        } else if (moves > 10 && moves <= 17) {
            starsModal.innerHTML = `<i class="fa fa-star"><i class="fa fa-star">`;
        } else if (moves > 17){
            starsModal.innerHTML = `<i class="fa fa-star">`;
        }
    };
}

function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    };
}


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
                 if (openedCards[0].innerHTML == openedCards[1].innerHTML) {
                   match();
                   matchedCards.push(card);
                   openedCards = [];
                   isOver();
                   //if they don't match...
                 } else {
                   noMatch();
                 };
             }
        }
     });
 });

/*function resetGame() {

    // reset time
    minutes = 0;
    seconds = 0;
    starCounter = 3;
    newTime = false;
    
    // reset stars
    star3.style.visibility = "inherit";
    star2.style.visibility = "inherit";

    // reset moves
    moves = 0;
    moveCounter.innerText = moves;
    timer.innerHTML = "00:00";
    clearInterval(time);

    openedCards = [];
    matchedCards = [];

    // Hides all cards
    deckOfCards.forEach(function (card) {
        card.classList.remove("match", "open", "show");
        card.classList.remove("match", "open", "show");
    })

}*/

//Event listener on l.77
 function resetClick() {
    //resetGame();
    //generateCard(card);
    window.location.reload(true);
}

function resetModalClick() {
    window.location.reload(true);
}