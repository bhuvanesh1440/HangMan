// Dummy Data
const hint = document.getElementById("hint");
const word = document.getElementById("word");
const msg = document.getElementById("msg");
const score = document.getElementById("score");
const timer = document.getElementById("timer");
const helpButton = document.getElementById("helpButton");
const startButton = document.getElementById("startButton");
const retryButton = document.getElementById("retryButton");

// sounds
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const timeUpSound = document.getElementById("timeUpSound");
const click = document.getElementById("click");
const correct =document.getElementById("correct");

const wordsToGuess = [
  ["apple", "a fruit"],
  ["elephant", "an animal"],
  ["vijaywada", "city name"],
  ["programming", "computer science"],
  ["beach", "a seaside location"],
  ["mountain", "a natural elevation"],
];
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

canvas.height = 400;
canvas.width = 400;
let selectedWord = "";
let displayWord = "";
let attempts = 0;
let maxAttempts = 6;
let guessedLetters = [];

const initializeGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const selectedIndex = parseInt(Math.random() * wordsToGuess.length);
  selectedWord = wordsToGuess[selectedIndex][0];
  hint.innerText = `Hint: ${wordsToGuess[selectedIndex][1]}`;
  displayWord = "_ ".repeat(selectedWord.length).trim();
  word.innerText = displayWord;
  drawHangman();
};

const drawHangman = () => {
  ctx.lineWidth = 3; // Make the line thicker

  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas first

  // draw base
  ctx.beginPath(); // Begin a new path
  ctx.fillStyle = "saddlebrown";
  ctx.fillRect(50, 370, 300, 20);
  ctx.stroke();

  // vertical pole
  ctx.beginPath(); // Begin a new path
  ctx.fillStyle = "saddlebrown";
  ctx.fillRect(100, 50, 20, 320);
  ctx.stroke();

  // horizontal line
  ctx.beginPath(); // Begin a new path
  ctx.fillStyle = "saddlebrown";
  ctx.fillRect(120, 70, 120, 10);
  ctx.stroke();

  if (attempts > 0) {
    // top
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(200, 80);
    ctx.lineTo(200, 120);
    ctx.stroke();
  }

  if (attempts > 1) {
    // face
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(230, 150);
    ctx.arc(200, 150, 30, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
  }

  if (attempts > 2) {
    // body
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(200, 180);
    ctx.lineTo(200, 280);
    ctx.stroke();
  }

  if (attempts > 3) {
    // left hand
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(200, 200);
    ctx.lineTo(150, 240);
    ctx.stroke();
  }

  if (attempts > 4) {
    // right hand
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(200, 200);
    ctx.lineTo(260, 240);
    ctx.stroke();
  }

  if (attempts > 5) {
    // left leg
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(200, 280);
    ctx.lineTo(150, 320);
    ctx.stroke();
  }

  if (attempts > 6) {
    // right leg
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(200, 280);
    ctx.lineTo(260, 320);
    ctx.stroke();
  }
};

const updateWord = () => {
  let updated = "";
  for (let i = 0; i < selectedWord.length; i++) {
    if (guessedLetters.indexOf(selectedWord[i]) > -1) {
      updated += selectedWord[i] + " ";
    } else {
      updated += "_ ";
    }
  }
  displayWord = updated;
  word.innerText = updated;
};

// Functions to play sounds
const playWrongSound = () => {
  wrongSound.play();
};

const playCorrectSound = () => {
  correct.play();
};

const playWinSound = () => {
  winSound.play();
};

const playLoseSound = () => {
  loseSound.play();
};

const playTimeUpSound = () => {
  timeUpSound.play();
};

const playButtonPressSound = () => {
  click.play();
};



document.getElementById("startButton").addEventListener("click", playButtonPressSound);
document.getElementById("retryButton").addEventListener("click", playButtonPressSound);
document.getElementById("helpButton").addEventListener("click", playButtonPressSound);


const attemptsDisplay = document.getElementById("attempts");
let attemptsLeft = 7;

const performAction = (event) => {
  const keyPressed = event.key.toLowerCase();
  if (guessedLetters.includes(keyPressed)) {
    return;
  }
  if (selectedWord.includes(keyPressed)) {
    playCorrectSound();
    updateScore();
    canvas.style.boxShadow = "0 0 100px #22bb33"; // Change box-shadow to green for correct guess
  } else {
    attempts++;
    attemptsLeft--; // Decrease attempts count for wrong guess
    attemptsDisplay.innerText = `Attempts🚨: ${attemptsLeft}`;
    canvas.style.boxShadow = "0 0 100px red"; // Change box-shadow to red for wrong guess
    playWrongSound();
    shakeCanvas();
  }
  guessedLetters.push(keyPressed.toLowerCase());
  // console.log({attempts, guessedLetters})
  updateWord();
  drawHangman();
  if (displayWord.replace(/ /g, "") === selectedWord) {
    msg.innerText = "🎉🥳You won🎉🥳";
    msg.className = "success";
    attemptsLeft=7
    attemptsDisplay.innerText = `Attempts🚨: ${attemptsLeft}`;
    console.log("win");
    clearInterval(timerInterval);
    playWinSound();
    setTimeout(() => {
      continueGame();
    }, 1000); // Call continueGame function to start the next word
  }
  if (attempts === 7) {
    msg.innerText = "😔Game over💀! ";

    msg.className = "warning";
    clearInterval(timerInterval);
    retryButton.style.display = "block";
    playLoseSound();
  }
};

// Function to shake the canvas
const shakeCanvas = () => {
  canvas.classList.add("shaking"); // Add the shaking class
  setTimeout(() => {
    canvas.classList.remove("shaking"); // Remove the shaking class after 0.5s
  }, 500);
};

document.addEventListener("keydown", performAction);

// to continue the game after winning:
const continueGame = () => {
  console.log("continuing...");
  initializeGame(); // Reset  game

  attempts = 0; 
  attemptsLeft=7
  guessedLetters = []; 
  msg.innerText = ""; 
  score.innerText = `Score🏆: ${points}`; // Update score display
  time = 60; // Reset time to 60 seconds
  timer.innerText = `Time🕒 : ${time}`; 

  clearInterval(timerInterval); // Clear previous timer 
  timerInterval = setInterval(updateTimer, 1000); // Start timer

  drawHangman(); // Redraw 
};

// implementing score
let points = 0;

const updateScore = () => {
  points++;

  score.innerText = `Score🏆: ${points}`;
};

// Implementing Time
let time = 60; // Time in seconds
let timerInterval;

// Implementing help Option

let helpCount = 2; // Initialize help count to +2 initially

const revealLetter = () => {
  if (helpCount > 0) {
    let hiddenIndices = [];
    for (let i = 0; i < selectedWord.length; i++) {
      if (displayWord[i] === "_") {
        hiddenIndices.push(i);
      }
    }
    if (hiddenIndices.length > 0) {
      const randomIndex =
        hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
      guessedLetters.push(selectedWord[randomIndex]);
      updateWord();
      drawHangman();
      helpCount--; // Decrease help count after successful use
      if (helpCount === 1) {
        // Change help button text to "+1" and add icon
        helpButton.innerHTML = '<i class="fas fa-lightbulb" id="bulbIcon"></i> +1';
      } else if (helpCount === 0) {
        // Change help button text to "0" and disable it
        helpButton.innerHTML = '<i class="fas fa-lightbulb" id="bulbIcon"></i>  0';
        helpButton.disabled = true;
      }
    }
  } else {
    // Optionally inform the player that the help limit has been reached
    console.log("Help limit reached!");
  }
};
const start = () => {
  // hideInstructions();
  initializeGame();
  startButton.style.display = "none";

  // Start the timer when the game initializes
  timerInterval = setInterval(updateTimer, 1000);
};

const updateTimer = () => {
  timer.innerText = `Time🕒 : ${time}`;
  if (time === 0) {
    clearInterval(timerInterval);
    playTimeUpSound()
    // End the game
    msg.innerText = "⌛Time's up! Game over💀 ";
    msg.className = "warning";
    retryButton.style.display = "block";
  } else {
    time--;
  }
};

const retryGame = () => {
  window.location.reload();
  retryButton.style.display = "none";
};

// Show the modal with rules initially
const rulesModal = document.getElementById("rulesModal");
rulesModal.style.display = "block";

// Hide the modal and start the game after a delay
setTimeout(() => {
  rulesModal.style.display = "none";
}, 10000);

// Close the modal if the close button is clicked
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === rulesModal) {
    rulesModal.style.display = "none";
  }
});
