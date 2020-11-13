<template>
  <div>
    <v-simple-table style="width: 520px; height: 400px; align-content: center" dir="ltr">
      <tbody>
      <tr v-for="row of net">
        <td
            :class="(col[2] === 'red' ) ? 'squre_red' : (col[2] === 555 ) ? 'squre_yellow' :'squre'"
            v-for="col of row"
            style="width: 1px; height: 27px; align-content: center"
        >

        </td>
      </tr>
      </tbody>
    </v-simple-table>
    <div style="padding: 100px" class="joyStick">
      <v-col
          cols="12"
      >
        <v-row>
          <v-btn style="visibility: hidden;"></v-btn>
          <v-btn style="font-size: 1.7rem" @click="turn('up')"  >^</v-btn>
          <v-btn style="visibility: hidden;"></v-btn>
          <v-btn @click="turn('right')" ><--</v-btn>
          <v-btn @click="turn('down')" >v</v-btn>
          <v-btn @click="turn('left')" >--></v-btn>
        </v-row>
        <span>ניקוד: {{ score }} </span>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "snakeGame",
  props: ['number'],
  data: () => ({
    net: [],
    score: 0,
    sideChoose: false,
    turnCounter: 0,
    play: true,
    stopFall: false,
    block:[0,0,0,0,0,0,0,0,0,0],
    x: null,
    y: null
  }),
  methods: {
    gamePlay(){
      const self = this
      this.x = 5
      this.y = 0
      this.nextSec(self)
    },
    nextSec(self){
      this.$forceUpdate()
      this.y++
      this.net[this.y][this.x].push('red')
      if(this.y - 1 !== 0) this.net[this.y - 1][this.x].pop()
      this.turnCounter++
      if (this.y === this.net.length - this.block[this.x] || this.net[this.y + 1][this.x][2] === 'red'){
        this.block[this.x] = this.net.length - this.y + 1
        this.gamePlay()
      } else if (this.turnCounter === 10000){
        this.play=false
      } else {
        window.setTimeout(function () {self.nextSec(self)}, 1500);
      }
    },
    turn(){

    },
    turnSide(side){
      if (this.x === 0 && side === -1 || this.x === this.block.length-1 && side === 1) return
      this.x = this.x + side
      if(this.y !== 0) this.net[this.y - 1][this.x - side].pop()
      this.$forceUpdate()
    },
    set(){
      const j = this.number
      for (let i = 0; i < 20; i++) {
        var array = []
        for (var g = 0; g < 10; g++) {
          let arr = []
          arr.push(i)
          arr.push(g)
          array.push(arr)
        }
        this.net.push(array)
      }
    }
  },
  created() {
    this.set()
  },
  mounted() {
    this.gamePlay()
    window.addEventListener('keydown', (e) => {
      // const kayArray = [3]
      if (e.key == 'ArrowUp') {
        this.turn('up')
      }
      if (e.key == 'ArrowLeft') {
        this.turnSide(-1)
      }
      if (e.key == 'ArrowDown') {
        this.turn('down')
      }
      if (e.key == 'ArrowRight') {
        this.turnSide(1)
      }
    });
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
.joyStick{
  position: absolute;
  top: 440px;
}
.box{
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