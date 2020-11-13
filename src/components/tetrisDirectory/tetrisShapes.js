export default {
   getShapesByIndex
}

let line = {color:'red',units: [[-1,0],[0,0,'c'],[1,0],[2,0]],switch:['down','right'],extraSwitch:1}

let plus = {color:'yellow',units: [[-1, 0], [0, 0, 'c'], [1, 0], [0, 1]],switch:['down', 'left','up', 'right'],extraSwitch:1}

let stairL = {color:'blue',units: [[-1,0],[0,0,'c'],[0,1],[1,1]],switch:['down','left'],extraSwitch:-1}

let stairR = {color:'purple',units: [[-1,1],[0,0,'c'],[0,1],[1,0]],switch:['down','left'],extraSwitch:-1}

let square = {color:'brown',units: [[-1,0],[0,0,'c'],[-1,1],[0,1]],switch:['down'],extraSwitch:1}

let knightR = {color:'pink',units: [[-1,0],[0,0,'c'],[1,0],[1,1]],switch:['down', 'left','up', 'right'],extraSwitch:-1}

let knightL = {color:'green',units: [[-1,0],[0,0,'c'],[1,0],[-1,1]],switch:['down', 'left','up', 'right'],extraSwitch:-1}

let shapesArray = [line,plus,stairL,stairR,square,knightR,knightL]

function getShapesByIndex(index){
   return shapesArray[index]
}