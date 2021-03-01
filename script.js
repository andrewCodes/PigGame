'use strict';

///////////////////////
// Select the elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//////////////////////
// Customise player names (uncomment if you want to be able to customise the player name fields)

// const player0Name = prompt('What is your name, player 1?');
// const player1Name = prompt('What is your name, player 2?');

// document.getElementById('name--0').textContent = player0Name;
// document.getElementById('name--1').textContent = player1Name;

///////////////////////
// Starting Conditions

const init = function () {

    scores = [0, 0]; // this array is made up of the total score for player0 and the total score for player1
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // (re)set all text to 0
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    // hide the dice
    diceEl.classList.add('hidden');

    // remove winner class if present
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    // set player0 as active player and remove active class from player1
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

};

init();

///////////////////
// Switch player

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // if the active player is 0, make the active 1 and vice versa
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

///////////////////////
// Rolling the dice

btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1 and switch to next player if so

        if (dice !== 1) {
            // add to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }
        else {
            // switch to next player
            switchPlayer();
        }
    }
});

////////////////////
// Hold current score

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore; // scores[0] is player0 total score, scores[1] is player1 total score
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if score >= 100

        if (scores[activePlayer] >= 100) { // True: finish game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        }
        else { // False: switch player
            switchPlayer();
        }
    }
});

////////////////////////
// Start new game

btnNew.addEventListener('click', init); // uses the init function to reset all conditions, text etc