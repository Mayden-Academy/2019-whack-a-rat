var rats = document.querySelectorAll('.rat')
var clock = document.querySelector('.clock')
var gameOver = document.querySelector('.game-over')
var tables = document.querySelectorAll('.table')
var startCountDown = document.querySelector('.start-countdown')
var startTimer = 4
var timer = 30
var frequency = 1500
var score = 0
var gameLoopId, countDownId, startCountDownID

/**
 * When you click on a rat, it disappears.
 *
 * @param {Node} rat The rat that is clicked.
 */
function whack(rat) {
    var deadRat = rat.nextElementSibling
    rat.classList.add('hidden')
    deadRat.classList.remove('hidden')

    setTimeout(function() {
        deadRat.classList.add('hidden')
    }, 200)
}

/**
 * A function to add a point to the score and update the scoreboard.
 */
function addToScore() {
    score += 1
    document.querySelector('.score').textContent = 'Rats : ' + score
}

/**
 * When you click on a rat, it is hidden and score is updated.
 *
 * @param {Nodelist} rats The rats in the DOM
 */
function startWhacking(rats) {
    rats.forEach(function(rat) {
        rat.addEventListener('click', function() {
            whack(rat)
            addToScore()
        })
    })
}

/**
 * A function that randomly selects an item from an array
 *
 * @param {Array} array The array to pick from
 * @return {Item} An item from the array
 */
function pickRandom(array) {
    return array[Math.floor(Math.random()*array.length)]
}

/**
 * A function that selects a random mole, displays it
 * and hides it after a defined period of time
 */
function showRat() {
    var hiddenRats = document.querySelectorAll('.rat.hidden')
    if (hiddenRats.length > 0) {
        var randomRat = pickRandom(rats)
        var time = [3000, 2000, 1000]
        randomRat.classList.remove('hidden')

        setTimeout(function() {
            randomRat.classList.add('hidden')
        }, pickRandom(time))
    }
    gameLoop()
}

/**
 * As gameClock increases rat frequency increases
 * function creates a loop by calling showRat which calls back gameLoop
 */
function gameLoop() {
    if (timer % 5 === 0) {
        frequency -= 100
    }
    gameLoopId = setTimeout(showRat, frequency)
}

/**
 * function makes tables fade to show play has stopped
 * @param variable of tables
 */
function fadeTables(tables) {
    tables.forEach(function(table) {
        table.style.opacity = '0.5'
    })
}

/**
 * A function to display the final score after the game is over and fade the tables out
 *
 */
function showFinalScore() {
    gameOver.classList.remove('hidden')

    var msg = 'You whacked ' + score + ' rats'

    if (score === 1) {
        msg = 'You whacked 1 rat'
    } else if (score === 0) {
        msg = 'You\'re such a loser'
    }

    gameOver.innerHTML = '<p>Game Over!</p><p class="final-score">' + msg + '</p>'

    fadeTables(tables)
}

/**
* Hide all the rats.
 *
 * @param {Nodelist} rats All the rats.
 */
function hideRats(rats) {
    rats.forEach(function(rat) {
        rat.classList.add('hidden')
    })
}

/**
 * Timer which counts down from 3 to 0, shows GO! when less then 1 and starts a game when countdown is finished.
 * @param startTimer
 */
function startCount() {
    startTimer -= 1
    if (startTimer < 0) {
        clearInterval(startCountDownID)
        startCountDown.classList.add('no_show')
        startClock()
        startWhacking(rats)
        gameLoop()
    } else if (startTimer < 1) {
        startCountDown.innerHTML = 'GO!'
    } else {
        startCountDown.innerHTML = startTimer
    }
}

/**
 * Timer which counts down from 30 to 0
 */
function countDown() {
    timer -= 1
    if (timer < 1) {
        clearTimeout(gameLoopId)
        clearInterval(countDownId)
        hideRats(rats)
        showFinalScore()
    }
    clock.innerHTML = timer
}

/**
 * A function that starts counting down the game clock.
 */
function startClock() {
    countDownId = setInterval(countDown, 1000)
}

/**
 * A function that starts counting down the game initial countdown.
 */
function startCountDownInterval() {
    startCountDownID = setInterval(startCount, 1000)
}

document.querySelector('.start_button').addEventListener('click', function() {
    startCountDownInterval()
})

