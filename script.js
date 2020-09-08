const square = document.querySelectorAll('.square')
const newGameBtn = document.querySelector('.new-game-btn')
const winningCombination = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
let allNumArr = []
let playerNumArr = []
let opponentNumArr = []
let timeOutId = 0
let isEnd = false

const gameControl = (() => {
    let timeOutId = 0
    let isEnd = false
    return {timeOutId, isEnd}
})()

const DataControl = (() => {
    const addAllNum = (num) => {
        allNumArr = [...allNumArr, num]
    }
    const addPlayerNum = (num) => {
        playerNumArr = [...playerNumArr, num]
    }
    const addOpponentNum = (num) => {
        opponentNumArr = [...opponentNumArr, num]
    }
    return { addAllNum, addPlayerNum, addOpponentNum }
})();

const Player = (() => {
    const hover = () => {
        let notPickedSquare = Array.from(square).filter((el) => el.classList.contains('not-picked'));
        notPickedSquare.forEach(el => el.classList.add('hover-o-shape'))
    }
    const attack = (el) => {
        isEnd = false;
        if (allNumArr.some(num => num === parseInt(el.getAttribute('data')))) {
            document.querySelector('.info-text').textContent = 'Pick another'
            isEnd = true
            return
        }
        el.classList.remove('not-picked')
        el.classList.add('o')
        let num = parseInt(el.getAttribute('data'))
        DataControl.addAllNum(num)
        DataControl.addPlayerNum(num)
        if (checkWin(playerNumArr)) {
            isEnd = true;
            endGame('player')
            return
        }
        if (allNumArr.length === 9) {
            isEnd = true;
            endGame('draw')
            return
        }
        square.forEach(square => square.classList.remove('hover-o-shape'))
        square.forEach(square => square.removeEventListener('click', handleClickSquare))
        // timeOutId = setTimeout(Opponent.attack, 2000);
    }
    return { hover, attack }
})();

const Opponent = (() => {
    const attack = () => {
        let randomNum = Math.floor(Math.random() * 9) + 1;
        while (allNumArr.some(num => num === randomNum)) {
            randomNum = Math.floor(Math.random() * 9) + 1;
        }
        let num = randomNum;
        DataControl.addOpponentNum(num)
        DataControl.addAllNum(num)
        let el = document.querySelector(`[data = '${num}']`)
        el.classList.remove('not-picked')
        el.classList.add('x')
        if (checkWin(opponentNumArr)) {
            endGame('opponent')
            return
        }
        if (allNumArr.length === 9) {
            endGame('draw')
            return
        }
        square.forEach(square => square.addEventListener('click', handleClickSquare))
        Player.hover()
    }
    return { attack }
})()

function play(el) {
    Player.attack(el);
    if (isEnd == true) return;
    timeOutId = setTimeout(Opponent.attack, 2000)
}

init();
newGameBtn.addEventListener('click', handleClickNewBtn)

function init() {
    clearTimeout(timeOutId)
    square.forEach(square => {
        square.addEventListener('click', handleClickSquare)
        square.classList.add('not-picked')
        square.classList.remove('x')
        square.classList.remove('o')
    });
    isEnd = false;
    timeOutId = 0
    allNumArr = []
    playerNumArr = []
    opponentNumArr = []
    Player.hover()
    document.querySelector('.info-text').textContent = 'Play'
}

function handleClickNewBtn() {
    init()
}

function handleClickSquare(e) {
    // Player.attack(e.target)
    play(e.target);
}

function checkWin(numArr) {
    let isWin = winningCombination.some(combine =>
        combine.every(num =>
            numArr.some(el => el == num)
        )
    );
    return isWin;
};

function endGame(winner) {
    if (winner === 'draw') {
        document.querySelector('.info-text').textContent = 'Draw'
    } else {
        document.querySelector('.info-text').textContent = `${winner.toUpperCase()} win!`
    }
    square.forEach(square => square.removeEventListener('click', handleClickSquare))
}