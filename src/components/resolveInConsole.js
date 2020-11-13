// let greySquare = document.querySelectorAll('.grey')
// let squareWithNumber = []
// let greenSquare = document.querySelectorAll('.green')
//
// let RENumberInit = / [1-9] /
// for (let i =0; i<greySquare.length; i++){
//
//     if(RENumberInit.test(greySquare[i].innerHTML)){
//
//         squareWithNumber.push(greySquare[i])
//     }
//
// }


// declare
let squareWithNumber = []
let allSquares = []
let RENumberInit = / [1-9] /
let columns = document.querySelectorAll('.box')
let flags = []
let Counter = 0

squareWithNumber = []
allSquares = []
RENumberInit = / [1-9] /
columns = document.querySelectorAll('.box')
flags = []
Counter = 0

allSquares = []
RENumberInit = / [1-9] /
columns = document.querySelectorAll('.box')
for (let i = 0; i < columns.length; i++) {
    let column = columns[i].querySelectorAll('div')
    for (let j = 1; j < column.length; j += 2) {
        let square = column[j]
        allSquares.push(square)

    }
}

allSquares[55].click()


setTimeout(() => {
    nextFlagSet()
}, 2000)


//-------------------------------------------------------------------------------
function setFlag(i) {
    // allSquares[i].innerHTML = flag
    let element = allSquares[i]

    if (document.createEvent) {
        var x = 0, y = 0; //In case the x and y coordinates of an element are
                          //significant, set it here.
        var rightClick = document.createEvent('MouseEvents');
        rightClick.initMouseEvent(
            'contextmenu', 1, 1, window, 1, x, y, x, y, 0, 0, 0, 0, 2/*right button*/, null
        );
        element.dispatchEvent(rightClick);
    }
}

//----------------------------------------------------------------------------------------------

function checkIfCanClick(numberInit, square) {
    console.log(square)
    let squareIndex = square.key
    let REGreen = /green/
    let squareAroundNumber = 0
    let squareAround = []
    let pointX
    let pointY
    let index = ''
    if (squareIndex / 10 < 1) {
        pointX = 0
        pointY = squareIndex
    } else {
        pointX = parseInt(`${squareIndex}`.slice(0, 1))
        pointY = parseInt(`${squareIndex}`.slice(1, 2))
    }
    for (let x = pointX - 1; x <= pointX + 1; x++) {
        for (let y = pointY - 1; y <= pointY + 1; y++) {
            if (x === pointX && y === pointY) continue
            if (y < 0 || x < 0 || y > 9 || x > 9) continue
            squareAroundNumber++
            index = parseInt(`${x}` + `${y}`)
            if (REGreen.test(allSquares[index].outerHTML)) {
                squareAround.push(index)
            }
        }
    }
    if (numberInit == squareAround.length) {
        squareAround.forEach(square => {
            if (!flags.includes(square)) {
                setFlag(square)
                flags.push(square)
            }

        })
    }
}

function loopOverNumberInit() {
    for (let i = 0; i < squareWithNumber.length; i++) {
        let square = squareWithNumber[i]
        let numberInit = square.square.querySelector('span').innerHTML[1]
        checkIfCanClick(numberInit, square)
    }
}


function nextFlagSet() {
    squareWithNumber = []
    for (let i = 0; i < allSquares.length; i++) {
        if (RENumberInit.test(allSquares[i].innerHTML)) {
            let square = {}
            square.key = i
            square.square = allSquares[i]
            squareWithNumber.push(square)
        }
    }
    Counter++
     loopOverNumberInit()
     checkSideSquare()
    if(Counter < 20){
        setTimeout(()=>{
            nextFlagSet()
        },2000)
    } else {
        console.log('done')
    }
}

function checkSideSquare() {
    for (let i = 0; i < squareWithNumber.length; i++) {
        let square = squareWithNumber[i]
        let numberInit = square.square.querySelector('span').innerHTML[1]
        checkIfCanClickLeft(numberInit, square)
    }
}

function checkIfCanClickLeft(numberInit, square) {
    console.log(square)
    let squareIndex = square.key
    let REGreen = /green/
    let flagCounter = 0
    let squareAround = []
    let pointX
    let pointY
    let index = ''
    if (squareIndex / 10 < 1) {
        pointX = 0
        pointY = squareIndex
    } else {
        pointX = parseInt(`${squareIndex}`.slice(0, 1))
        pointY = parseInt(`${squareIndex}`.slice(1, 2))
    }
    for (let x = pointX - 1; x <= pointX + 1; x++) {
        for (let y = pointY - 1; y <= pointY + 1; y++) {
            if (x === pointX && y === pointY) continue
            if (y < 0 || x < 0 || y > 9 || x > 9) continue
            index = parseInt(`${x}` + `${y}`)
            if (REGreen.test(allSquares[index].outerHTML)) {
                squareAround.push(index)
            }
            if (flags.includes(index)) {
                flagCounter++
            }
        }
    }


    if (numberInit == flagCounter) {
        squareAround.forEach(square => {
           allSquares[square].click()
        })
    }
}