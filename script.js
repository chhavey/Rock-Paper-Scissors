//rules

const rulesButton = document.getElementById('rules');
const rulesBox = document.getElementById('rules-box');
const closeButton = document.getElementById('close-button');

rulesButton.addEventListener('click', () => {
    rulesBox.style.display = 'block'; // Show the rules box
});

closeButton.addEventListener('click', () => {
    rulesBox.style.display = 'none'; // Hide the rules box
});



//score

const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');

const options = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

// Function to randomly select computer's choice
function computerPlay() {
    return options[Math.floor(Math.random() * options.length)];
}

// Function to update scores and display winner
function updateScores(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        displayResult(playerChoice, computerChoice);
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        playerScore++;
        playerScoreElement.textContent = playerScore;
        displayResult(playerChoice, computerChoice);
    } else {
        computerScore++;
        computerScoreElement.textContent = computerScore;
        displayResult(playerChoice, computerChoice);
    }

    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}

// Function to retrieve scores from localStorage when the page loads
function retrieveScores() {
    playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
    computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

// Call the retrieveScores function when the page loads
window.addEventListener('load', retrieveScores);

// Function to display game result

function displayResult(playerChoice, computerChoice) {
    document.getElementById('img-container').style.display = 'none';
    document.getElementById('hidden').style.display = 'block';

    const playerImage = document.createElement('img');
    playerImage.src = `./img/${playerChoice}.png`;
    playerImage.alt = playerChoice;
    (playerChoice === 'rock' ? playerImage.classList.add('fist') : playerChoice === 'paper' ? playerImage.classList.add('hand') : playerImage.classList.add('fingers'))
    document.querySelector('.your-choice-selected').appendChild(playerImage);

    const computerImage = document.createElement('img');
    computerImage.src = `./img/${computerChoice}.png`;
    computerImage.alt = computerChoice;
    (computerChoice === 'rock' ? computerImage.classList.add('fist') : computerChoice === 'paper' ? computerImage.classList.add('hand') : computerImage.classList.add('fingers'))
    document.querySelector('.pc-choice-selected').appendChild(computerImage);

    // if (playerScore > computerScore) {
    //     document.getElementById('next').style.display = 'block';
    // }

    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        playerImage.classList.add('winner');
        document.getElementById('play-again').style.display = 'block';
        document.getElementById('next').style.display = 'block';
        document.getElementById('won').style.display = 'block';
    }

    else if (playerChoice === computerChoice) {
        document.getElementById('replay').style.display = 'block';
        document.getElementById('next').style.display = 'none';
        document.getElementById('tie').style.display = 'block';
    }
    else {
        computerImage.classList.add('winner');
        document.getElementById('play-again').style.display = 'block';
        document.getElementById('next').style.display = 'none';
        document.getElementById('lost').style.display = 'block';
    }

    // Display the game result section
    document.querySelector('.winner-result').style.display = 'block';

}

document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));

// Function to play game
function playGame(playerChoice) {
    const computerChoice = computerPlay();
    updateScores(playerChoice, computerChoice);
}


//play again

const gameArea = document.getElementById('img-container');
const resultArea = document.getElementById('hidden');

const yourChoiceSelected = document.querySelector('.your-choice-selected');
const pcChoiceSelected = document.querySelector('.pc-choice-selected');
const resultButtons = document.querySelector('.result-button');
const resultTexts = document.querySelectorAll('.result-text div');
const playerChoiceImages = yourChoiceSelected.getElementsByTagName('img');
const computerChoiceImages = pcChoiceSelected.getElementsByTagName('img');

const playAgainButton = document.getElementById('play-again');

playAgainButton.addEventListener('click', () => {
    // Show the game area and hide the result area
    gameArea.style.display = 'block';
    resultArea.style.display = 'none';

    // Reset the game result section
    yourChoiceSelected.innerHTML = '';
    pcChoiceSelected.innerHTML = '';
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('replay').style.display = 'none';

    // Reset the winner/result texts
    resultTexts.forEach(resultText => {
        resultText.style.display = 'none';
    });

    // reset images
    for (const image of playerChoiceImages) {
        image.classList.remove('winner');
    }
    for (const image of computerChoiceImages) {
        image.classList.remove('winner');
    }
});

//replay

const replayButton = document.getElementById('replay');

replayButton.addEventListener('click', () => {
    // // Reset scores
    // playerScore = 0;
    // computerScore = 0;
    // playerScoreElement.textContent = playerScore;
    // computerScoreElement.textContent = computerScore;

    // reset game and area result
    gameArea.style.display = 'block';
    resultArea.style.display = 'none';

    // clear all result
    yourChoiceSelected.innerHTML = '';
    pcChoiceSelected.innerHTML = '';
    resultTexts.forEach(resultText => {
        resultText.style.display = 'none';
    });

    // reset images
    for (const image of playerChoiceImages) {
        image.classList.remove('winner');
    }
    for (const image of computerChoiceImages) {
        image.classList.remove('winner');
    }

    // hide replay button
    replayButton.style.display = 'none';
});


//hurray page

const nextButton = document.getElementById('next');

nextButton.addEventListener('click', () => {
    window.location.href = 'hurray.html';
});
