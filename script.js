const square = document.querySelectorAll('.square')

let attackedArr = [];

function Player () {
    const playerTurn = () => {
        square.forEach(square => square.classList.add('hover-o-shape'))
    }
    return {playerTurn}
}

Player().playerTurn()