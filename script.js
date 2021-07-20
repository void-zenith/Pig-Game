'use strict';

//selecting elemetns
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

let score, scores, activePlayer, isPlaying;

const init = function() {
    //init means initialization
    score = 0; //variable to store the current score
    activePlayer = 0; //variables to store score of active player
    scores = [0, 0]; //storing both players score
    isPlaying = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player-active');
    player1El.classList.remove('player-active');
};
init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    score = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; //comparing wit itself

    player0El.classList.toggle('player--active'); //toggling on and off
    player1El.classList.toggle('player--active');
}

const randomDice = function() {
    let ranNum = Math.trunc(Math.random() * 6) + 1;
    // 2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${ranNum}.png`;
    return ranNum;
};



btnRollEl.addEventListener('click', function() {
    // 1. generating a random dice roll
    if (isPlaying) {
        let dice = randomDice();

        //3. check if rolled dice is 1
        //4. if true switch to next player
        if (dice == 1) {
            switchPlayer();
            // if (player0El.classList.contains('player--active')) {
            //     player0El.classList.remove('player--active');
            //     player1El.classList.add('player--active');
            // } else {
            //     player1El.classList.remove('player--active');
            //     player0El.classList.add('player--active');
            // }
        } else {
            //add the value of dice to current score
            score = score + dice;
            document.getElementById(`current--${activePlayer}`).textContent = score;
        }
    }
});

btnHoldEl.addEventListener('click', function() {
    //1. Add current score to active players score
    if (isPlaying) {
        scores[activePlayer] += score;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        //2. check if player score is less than 100
        if (scores[activePlayer] >= 100) {
            isPlaying = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            //3.swith to nextpplayer
            switchPlayer();
        }
    }
});

btnNewEl.addEventListener('click', init);