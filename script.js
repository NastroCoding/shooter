const gameContainer = document.getElementById('game-container')
const scoreBoard = document.getElementById('score-board')
const timerDisplay = document.getElementById('timer')
const gameOverScreen = document.getElementById('game-over')
const finalScoreDisplay = document.getElementById('final-score')

let score = 0
let timeLeft = 30;
let timer;
let targets = []
const TOTAL_TARGET = 3

function createTargets(count) {

    for (let i = 0; i < count; i++ ) {
        const target = document.createElement('div');
        target.classList.add('target')

        const containerRect = gameContainer.getBoundingClientRect();
        const x = Math.max(0, Math.min(
            containerRect.width - 50,
            Math.random() * containerRect.width
        ))

        const y = Math.max(0, Math.min(
            containerRect.height - 50,
            Math.random() * containerRect.height
        ))

        target.style.left = `${x}px`
        target.style.top = `${y}px`

        target.addEventListener('click', hitTarget);

        gameContainer.appendChild(target);

        target.offsetWidth;

        target.classList.add('active')

        targets.push(target)
    }
}

function hitTarget(e){

    score += 10
    scoreBoard.textContent = `Score: ${score}`;

    e.target.classList.add('destroy')

    const index = targets.indexOf(e.target)
    if (index > -1) {
        targets.splice(index, 1)
        e.target.remove();
    }

    if (targets.length === 0){
        createTargets(TOTAL_TARGET);
    }
}

function updateTimer() {
   timeLeft--;
   timerDisplay.textContent = `Time: ${timeLeft}`
}

function startGame() {

    score = 0
    timeLeft = 30
    scoreBoard.textContent = 'Score: 0'
    timerDisplay.textContent = 'Time: 30'
    gameOverScreen.style.display ='none';

    createTargets(TOTAL_TARGET);

    timer = setInterval(updateTimer, 1000);
}

startGame();

