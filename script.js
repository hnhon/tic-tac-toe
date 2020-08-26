const square = document.querySelectorAll('.square')
const newGameBtn = document.querySelector('.new-game-btn')
const winningCombination = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
let allNumArr = []
let playerNumArr = []
let opponentNumArr = []

newGameBtn.addEventListener('click', init)

init ();

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
        el.classList.remove('not-picked')
        el.classList.add('o')
        let num = parseInt(el.getAttribute('data'))
        DataControl.addAllNum(num)
        DataControl.addPlayerNum(num)
        if (checkWin(playerNumArr)) {
            endGame('player')
            return
        }
        if (allNumArr.length === 9) {
            endGame('draw')
            return
        }
        square.forEach(square => square.removeEventListener('click', handleClickSquare))
        Opponent.attack()
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
    }
    return { attack }
})()

// square.forEach(square => square.addEventListener('click', e => Player.attack(e.target)))
// square.forEach(square => square.addEventListener('click', handleClickSquare))

function init() {
    allNumArr = []
    playerNumArr = []
    opponentNumArr = []
    document.querySelector('.info-text').textContent = 'Your Turn'
    square.forEach(square => square.addEventListener('click', handleClickSquare));
    square.forEach(square=> square.classList.add('not-picked'))
    square.forEach(square=> square.classList.remove('x'))
    square.forEach(square=> square.classList.remove('o'))
}

function handleClickSquare(e) {
    Player.attack(e.target)
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
//Debug function
// const winning = [[1, 2, 3], [4, 5, 6]]
// function checkWinTest() {
//     let test = [1, 3, 5, 7, 9, 2];
//     winning.some(combine => combine.every(num => test.some(el => el == num))) ? console.log('win') : console.log('lose')
// }
// checkWinTest()