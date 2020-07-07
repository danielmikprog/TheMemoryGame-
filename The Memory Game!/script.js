


const container = document.getElementById("game");       // called game id from html document

let card1 = null;                                        // nullified the first clicked card value
let card2 = null;
let cardsFlipped = 0;                                    // clicking starts at 0
let noClicking = false;                                  // no clicking is false. It does nothing.


// 10 colors are listed in an array
// the colors will be matched in the game
// 5 different colors total

const cardColors = [                                    
  "red",
  "blue",
  "green",
  "yellow",
  "teal",
  "red",
  "blue",
  "green",
  "yellow",
  "teal"
];

// shuffle function will mix the colors up
 // shuffling is based on the number of colors
function shuffleCards(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter); // a method that picks a random num 
        
    counter--;                                       // Decrease counter by 1        
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card

let shuffledColors = shuffleCards(cardColors);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    container.append(newDiv);
  }
}
// fx that handles what the clicks
// by using conditional if statements

function handleCardClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

   
    // when flipped twice
    // remain on screen if match
    // turn back if not true.
  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 500);
    }
  }
   // once num flip = num color game is over
  if (cardsFlipped === cardColors.length) alert("You Lost!");
}
 // function is called
createDivsForColors(shuffledColors);
