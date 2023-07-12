// global
let child
let legalMoves = []
let dotId
let firstDot
let playerColor = 'red'
let alreadyPlayed = []
let claimedSquare = []

// create and display all the dots
for (i=1; i<101; i++) {
    child = document.createElement('div')
    child.setAttribute('class', 'dot')
    child.setAttribute('id', i)
    child.setAttribute('onClick', 'addLine(this.id)')
    document.getElementById('dots').appendChild(child)
}
// create and display all the claims
for (i=1; i<90; i++) {
    if (![10, 20, 30, 40, 50, 60, 70, 80].includes(i)) {
        child = document.createElement('div')
        child.setAttribute('id', ('c' + i))
        child.setAttribute('class', 'claim')
        document.getElementById('claims').appendChild(child)
    }
}
// create and display connector lines
for (i=1; i<100; i++) {
    if (![10, 20, 30, 40, 50, 60, 70, 80, 90].includes(i)) {
        child = document.createElement('div')
        child.setAttribute('id', i + '-' + (i+1))
        child.setAttribute('class', 'hLine')
        document.getElementById('hLines').appendChild(child)
    }
}
for (i=1; i<91; i++) {
    child = document.createElement('div')
    child.setAttribute('id', i + '-' + (i+10))
    child.setAttribute('class', 'vLine')
    document.getElementById('vLines').appendChild(child)
}

function addLine(d) {
    dotId = +d
    let dot = document.getElementById(dotId)
    if (legalMoves == 0) {
        document.getElementById(dotId).style.animation = 'blink 1s linear infinite'
        firstDot = dotId 
        // first column
        if (![1, 11, 21, 31, 41, 51, 61, 71, 81, 91].includes(dotId)) {
            legalMoves.push(dotId-1)
        }
        // last column
        if (![10, 20, 30, 40, 50, 60, 70, 80, 90, 100].includes(dotId)) {
            legalMoves.push(dotId+1)
        }    
        // first row
        if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(dotId)) {
            legalMoves.push(dotId-10)
        }
        // last row
        if (![91, 92, 93, 94, 95, 96, 97, 98, 99, 100].includes(dotId)) {
            legalMoves.push(dotId+10)
        }
        for (i=1; i<legalMoves.length; i++) {
            legalMoves.forEach(move => {
                document.getElementById(move).style.backgroundColor = playerColor
            });
        }
    } else if (legalMoves.includes(dotId) && !alreadyPlayed.includes(firstDot + '-' + dotId)) {
            dot.style.backgroundColor = playerColor
            // make line
            if (firstDot < dotId) {
                document.getElementById(firstDot + '-' + dotId).style.backgroundColor = playerColor
            } else if (firstDot > dotId) {
                document.getElementById(dotId + '-' + firstDot).style.backgroundColor = playerColor
            }
            document.getElementById(firstDot).style.backgroundColor = ''
            document.getElementById(dotId).style.backgroundColor = ''
            alreadyPlayed.push(firstDot + '-' + dotId)
            alreadyPlayed.push(dotId + '-' + firstDot)
            // check if claimed
            for (i=1; i<90; i++) {
                if (alreadyPlayed.includes(i + '-' + (i+1)) && alreadyPlayed.includes((i+10) + '-' + (i+11)) && alreadyPlayed.includes((i) + '-' + (i+10)) && alreadyPlayed.includes((i+1) + '-' + (i+11)) && !claimedSquare.includes(i)) {
                    document.getElementById('c'+i).style.backgroundColor = playerColor
                    claimedSquare.push(i)
                }
            }
            // reset
            for (i=1; i<legalMoves.length; i++) {
                legalMoves.forEach(move => {
                    document.getElementById(move).style.backgroundColor = 'black'
                });
            }
            document.getElementById(firstDot).style.animation = ''
            firstDot = 0
            dotId = 0
            legalMoves = []
            changeTurns()
    } else if (dotId == firstDot) {
        // reset if button is unclicked
        for (i=1; i<legalMoves.length; i++) {
            legalMoves.forEach(move => {
                document.getElementById(move).style.backgroundColor = 'black'
            });
        }
        document.getElementById(firstDot).style.animation = ''
        firstDot = 0
        dotId = 0
        legalMoves = []
    }
}

function changeTurns() {
    if (playerColor == 'red') {
        playerColor = 'blue'
    } else if (playerColor == 'blue') {
        playerColor = 'red'
    }
}