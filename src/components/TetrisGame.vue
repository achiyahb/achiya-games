<template>
  <div>
    <div dir="ltr" style=" width: 17rem; display: grid;grid-template-columns: repeat(10, 1fr)">
      <div v-for="row of net">
        <div v-for="col of row">
          <div
              :class="col[2] ? (col[2].color? `${col[2].color} lighten-1` : '') :((col[0] + col[1])%2 !== 0 ? 'blue lighten-4':'blue lighten-5')"
              style="width: 1.7rem; height: 1.7rem; font-size: 10px; border: black"
          >
          </div>
        </div>
      </div>
    </div>
    <div>
      <timer :start="start" :stop="gameOver"/>
      <span>score: {{ score }} level: {{ level }}</span>
    </div>
    <div style=" display: flex;">
    <div dir="ltr" style=" width: 8rem; display: grid;grid-template-columns: repeat(10, 1fr)">
      <div v-for="row of nextShapeNet">
        <div v-for="col of row">
          <div
              :class="col[2] ? (col[2].color? `${col[2].color} lighten-1` : '') :((col[0] + col[1])%2 !== 0 ? 'blue lighten-4':'blue lighten-5')"
              style="width: 2rem; height: 2rem; font-size: 10px; border: black"
          >
          </div>
        </div>
      </div>
    </div>
    <div  style="width: 10rem;display: grid;grid-template-columns: repeat(3, 1fr)">
      <v-btn style="visibility: hidden;"></v-btn>
      <v-btn style="font-size: 1.7rem" @click="turnUp()">^</v-btn>
      <v-btn style="visibility: hidden;"></v-btn>
      <v-btn @click="turnSide(1)"><--</v-btn>
      <v-btn @click="turnDown">v</v-btn>
      <v-btn @click="turnSide(-1)">--></v-btn>
    </div>
    </div>
  </div>
</template>

<script>
import tetrisShapes from "@/components/tetrisDirectory/tetrisShapes";
import Timer from "@/components/tools/timer";

export default {
  name: "snakeGame",
  components: {Timer},
  props: ['number'],
  data: () => ({
    net: [],
    score: 0,
    sideChoose: false,
    turnCounter: 0,
    play: true,
    stopFall: false,
    block: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    x: null,
    y: null,
    clearArray: [],
    switch: null,
    switchIndex: 0,
    setNewShape: true,
    shapesIndex: [],
    shapesCounter: 0,
    stop: false,
    height: 20,
    start: false,
    gameOver: false,
    level: 1,
    time: 1500,
    ticker: null,
    downButton: false,
    downSec: false,
    nextShapeNet: [],
    clearArrayNext: []
  }),
  methods: {
    gamePlay() {
      if (this.gameOver) {
        return
      }
      this.displayNextShape()
      this.x = 5
      this.y = 0
      if (this.start) {
        this.nextSec()
        this.start = false
      }

    },
    goDown(button) {

      if (!button) {
        if (this.downButton) {
          return
        } else {
          this.y++
          this.downSec = false
        }
      } else {
        if (this.downSec) {
          return
        } else {
          this.y++

        }
      }


    },
    nextSec() {

      this.ticker = setInterval(() => {

        if (this.gameOver) {
          return
        }
        if (this.clearArray.length !== 0) {
          this.checkBlock()
        }
        this.displayShape()
        this.checkDown() ? this.goDown() : ''
      }, this.time)
    },
    clearLastSec() {
      for (let point of this.clearArray) {
        let x = point[0]
        let y = point[1]
        this.net[x][y].pop()
        this.net[x][y].pop()
      }
      this.clearArray = []
    },
    clearNextShape() {
      for (let point of this.clearArrayNext) {
        let x = point[0]
        let y = point[1]
        this.nextShapeNet[x][y].pop()
      }
      this.clearArrayNext = []
    },
    displayShape() {
      let shape = this.shape()
      let center = [this.x, this.y]
      let switchIt = this.switchIt()
      let ExSw = shape.extraSwitch
      this.clearLastSec()
      for (let index in shape.units) {
        if (shape.units[index][2]) {
          this.net[this.x][this.y].push(shape)
          this.net[this.x][this.y].push('move')
          this.clearArray.push(center)
        } else {
          let x
          let y
          if (switchIt[1]) {
            x = center[0] + shape.units[index][0] * switchIt[0]
            y = center[1] + shape.units[index][1] * switchIt[0]
          } else {
            y = center[1] + shape.units[index][0] * switchIt[0]
            x = center[0] + shape.units[index][1] * switchIt[0] * ExSw
          }
          this.net[x][y].push(shape)
          this.net[x][y].push('move')
          this.clearArray.push([x, y])
        }
      }
    },
    checkRound() {
      let x
      let y
      let clearWay = true
      let shape = this.shape()
      let center = [this.x, this.y]
      let switchIndex = this.switchIndex === shape.switch.length - 1 ? 0 : this.switchIndex + 1
      let checkSwitch = shape.switch[switchIndex]
      let switchIt = this.switchIt(checkSwitch)
      let ExSw = shape.extraSwitch
      for (let index in shape.units) {
        if (!shape.units[index][2]) {
          if (switchIt[1]) {
            x = center[0] + shape.units[index][0] * switchIt[0]
            y = center[1] + shape.units[index][1] * switchIt[0]
          } else {
            y = center[1] + shape.units[index][0] * switchIt[0]
            x = center[0] + shape.units[index][1] * switchIt[0] * ExSw
          }
          if (x < 0 || x > 9 || y < 0 || y > 19) {
            clearWay = false
          } else if (this.net[x][y][3] === 'block') {
            clearWay = false
          }
        }
      }
      return clearWay
    },
    switchIt(check) {
      let switch1 = check ? check : this.switch
      let switchArr = []
      switchArr.push((switch1 === 'up' || switch1 === 'right') ? -1 : 1)
      switchArr.push((switch1 === 'up' || switch1 === 'down') ? 1 : 0)
      return switchArr
    },
    checkDown() {
      let clearWay = true
      for (let point of this.clearArray) {
        let x = point[0]
        let y = point[1]
        if (y >= 19 && this.net[x][y][3] === 'move') {
          clearWay = false
        } else if (this.net[x][y + 1][3] === 'block' && this.net[x][y][3] === 'move') {
          clearWay = false
        }
      }
      return clearWay
    },
    checkBlock() {
      for (let point of this.clearArray) {
        let x = point[0]
        let y = point[1]
        if (y >= 19 && this.net[x][y][3] === 'move') {
          this.setBlock()
        } else if (this.net[x][y + 1][3] === 'block' && this.net[x][y][3] === 'move') {
          this.setBlock()
        }
      }
    },
    setBlock() {
      for (let point of this.clearArray) {
        let x = point[0]
        let y = point[1]
        let swap = this.net[x][y][2]
        let block = {}
        block.color = swap.color
        this.net[x][y][2] = block
        this.net[x][y][3] = 'block'
        this.height = y < this.height ? y : this.height
        if (this.height === 0) {
          this.gameOver = true
        }
      }
      this.checkRows()
      this.clearArray = []
      this.setNewShape = true
      this.shapesCounter++
      this.gamePlay()

    },
    displayNextShape() {
      let shape = this.shape(1)
      let center = [1, 0]
      this.clearNextShape()
      for (let index in shape.units) {
        if (shape.units[index][2]) {
          this.nextShapeNet[1][0].push(shape)
          this.clearArrayNext.push(center)
        } else {
          let x = center[0] + shape.units[index][0]
          let y = center[1] + shape.units[index][1]
          this.nextShapeNet[x][y].push(shape)
          this.clearArrayNext.push([x, y])
        }
      }

    },
    checkRows() {
      let remove = []
      for (let i = this.height; i <= 19; i++) {
        let counter = 0
        for (let j = 0; j < 10; j++) {
          if (this.net[j][i][3] === 'block') {
            counter++
          } else {
            break
          }
          if (counter === 10) {
            remove.push(i)
            this.score = this.score + 10
            if (this.score % 70 === 0) {
              this.level++
              this.time = 1500 - 150 * this.level
              console.log(this.time)
              this.ticker = null
              console.log(this.ticker)
              this.nextSec()
              console.log(this.ticker)
            }
          }
        }
      }
      if (remove.length) {
        this.deleteRow(remove)
      }
    },
    deleteRow(rowToRemove) {
      const self = this
      for (let row of rowToRemove) {
        for (let x = 0; x < 10; x++) {
          this.net[x][row].pop()
          this.net[x][row].pop()
          this.net[x][row].push({color: 'grey'})
          setTimeout(function () {
            self.net[x][row].pop()
          }, 500)
        }
        setTimeout(function () {
          self.rowDown(row)
        }, 500)
      }
    },
    rowDown(row) {

      if (row > this.height) {
        for (let y = row - 1; y >= this.height; y--) {
          for (let x = 0; x < 10; x++) {
            if (this.net[x][y][2]) {
              this.net[x][y + 1][2] = this.net[x][y][2]
              this.net[x][y + 1][3] = this.net[x][y][3]
              this.net[x][y].pop()
              this.net[x][y].pop()
            }
          }
        }
      }
    },
    // nextSec() {
    //   const self = this
    //   if (this.clearArray.length !== 0) {
    //     this.checkBlock()
    //   }
    //   this.displayShape()
    //   this.y++
    //   this.nextSec()
    //   window.setTimeout(function () {
    //     self.stopIf()
    //   }, 2000);
    // },
    checkSide(side) {
      let clearWay = true
      let location = this.clearArray
      for (let i in location) {
        let x = location[i][0]
        let y = location[i][1]
        if (x + side === -1 || x + side === 10) {
          clearWay = false
        } else if (this.net[x + side][y][3] === 'block') {
          clearWay = false
        }
      }
      return clearWay
    },
    turnUp() {
      let allow = this.checkRound()
      if (!allow) {
        return
      }
      let shapeSwitch = this.shape().switch
      if (this.switchIndex < shapeSwitch.length - 1) {
        this.switchIndex++
      } else {
        this.switchIndex = 0
      }
      this.switch = shapeSwitch[this.switchIndex]
      this.displayShape()
    },
    turnSide(side) {
      let allow = this.checkSide(side)
      if (!allow) {
        return
      }
      if (this.x === 0 && side === -1 || this.x === this.block.length - 1 && side === 1) return
      this.x = this.x + side
      this.displayShape()
    },
    turnDown() {
      let allow = this.checkDown()
      if (!allow) {
        return
      }
      this.downButton = true
      if (this.clearArray.length !== 0) {
        this.checkBlock()
      }
      this.goDown('button')
      this.displayShape()
      this.downButton = false
    },
    shape(next) {
      let index = this.shapesIndex[this.shapesCounter + (next ? next : 0)]
      let shape = tetrisShapes.getShapesByIndex(index)
      if (this.setNewShape) {
        this.switch = shape.switch[0]
        this.setNewShape = false
      }
      return shape
    },
    setShapeIndex() {
      for (let i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * 7)
        this.shapesIndex.push(x)
      }
    },
    set() {

      for (let i = 0; i < 10; i++) {
        var array = []
        for (var g = 0; g < 20; g++) {
          let arr = []
          arr.push(i)
          arr.push(g)
          array.push(arr)
        }
        this.net.push(array)
      }
    },
    setNextShapeNet() {

      for (let i = 0; i < 4; i++) {
        let array = []
        for (let g = 0; g < 2; g++) {
          let arr = []
          arr.push(i)
          arr.push(g)
          array.push(arr)
        }
        this.nextShapeNet.push(array)
      }
    },

  },
  created() {
    this.set()
    this.setNextShapeNet()
    this.setShapeIndex()
  },
  mounted() {
    this.start = true
    window.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowUp') {
        this.turnUp()
      }
      if (e.key == 'ArrowLeft') {
        this.turnSide(-1)
      }
      if (e.key == 'ArrowDown') {
        this.turnDown()
      }
      if (e.key == 'ArrowRight') {
        this.turnSide(1)
      }
    });
    this.gamePlay()
  }


}
</script>

<style scoped>
.squre {
  background-color: aquamarine;
}

.squre_yellow {
  background-color: yellow;
}

.squre_red {
  background-color: red;
}

.joyStick {
  position: absolute;
  top: 440px;
}

.box {
  align-content: center;
}

</style>

// createSnake() {
//   const self = this
//   let x = 1
//   let y = 1
//   let i = 0
//   let j = 6
//   let endY
//   let endX
//
//   while (i<1000){
//     i++
//     (function (i) {
//       window.setTimeout(function () {
//         if (x === 999 || y === 999){
//           self.$emit('childToParent', 'end')
//           return
//         }
//         if(self.right){
//           x = x < self.number-1 ? x+1 : 999
//         } else if (self.up){
//           y = y > 0 ? y-1 : 999
//         } else if (self.down) {
//           y = y < self.number ? y+1 : 999
//         } else {
//           x = x > 0 ? x-1 : 999
//         }
//         if (x === 999 || y === 999){
//           return
//         }
//         let swap = self.net[y][x]
//         if (swap[2]){
//           j++
//           self.score = self.score + 10
//           swap.pop()
//         }
//         if (!swap.length){
//           x = 999
//           return
//         }
//         self.snake.push(swap)
//         self.head = swap
//         self.net[y][x] = 100
//         if (self.snake.length === j - 1){
//           self.creatApple()
//         }
//
//         if (self.snake.length >= j) {
//           let swap2 = self.snake[0]
//           endY = swap2[1]
//           endX = swap2[0]
//           self.net[endX][endY] = swap2
//           self.snake.shift()
//
//         }
//         self.sideChoose = false
//         self.$forceUpdate()
//
//       }, i * 500);
//     }(i));
//   }
// },
// turn(side){
//   if(this.sideChoose){
//     return
//   }
//   if( this.right && side === 'left'){
//     return
//   }
//   if( this.down && side === 'up'){
//     return
//   }
//   if( this.up && side === 'down'){
//     return
//   }
//   if( this.left && side === 'right'){
//     return
//   }
//   this.right = (side === 'right')
//   this.down = (side === 'down')
//   this.up = (side === 'up')
//   this.left = (side === 'left')
//   this.sideChoose = true
// },
// creatApple(){
//   let x = Math.floor(Math.random() * this.number)
//   let y = Math.floor(Math.random() * this.number)
//   this.apple = this.net[y][x] === 100 ? this.creatApple() : this.net[y][x]
//   this.net[y][x].push(555)
// },
