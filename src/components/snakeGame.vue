<template>
  <div>
    <input @keyup.up="turn('up')" @keyup.left="turn('left')" @keyup.down="turn('down')" @keyup.right="turn('right')" />
    <v-simple-table style="width: 520px; height: 400px; align-content: center" dir="ltr">
      <tbody>
      <tr v-for="row of net">
        <td
            :class="(col === 100 ) ? 'squre_black' : (col[2] === 555 ) ? 'squre_yellow' :'squre'"
            v-for="col of row"
            style="width: 1px; height: 40px; align-content: center"
        >

        </td>
      </tr>
      </tbody>
    </v-simple-table>
    <div style="padding: 90px" class="joyStick">
    <v-col>
      <v-row>
        <v-btn style="visibility: hidden;"></v-btn>
        <v-btn style="font-size: 1.7rem" @click="turn('up')" >^</v-btn>
        <v-btn style="visibility: hidden;"></v-btn>
        <v-btn @click="turn('right')" ><--</v-btn>
        <v-btn @click="turn('down')" >v</v-btn>
        <v-btn @click="turn('left')" >--></v-btn>
      </v-row>

      <span v-if="even">אורך הנחש: {{ snake.length }} </span>
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
    even: true,
    snake: [],
    net: [],
    head: [],
    apple: [],
    right: true,
    up: false,
    down: false,
    left: false,
    score: 0,
    sideChoose: false
}),
  methods: {

    createSnake() {
      const self = this
      let x = 1
      let y = 1
      let i = 0
      let j = 6
      let endY
      let endX

      while (i<1000){
        i++
        (function (i) {
          window.setTimeout(function () {
            if (x === 999 || y === 999){
              self.$emit('childToParent', 'end')
              return
            }
            if(self.right){
              x = x < self.number-1 ? x+1 : 999
            } else if (self.up){
              y = y > 0 ? y-1 : 999
            } else if (self.down) {
              y = y < self.number ? y+1 : 999
            } else {
             x = x > 0 ? x-1 : 999
            }
            if (x === 999 || y === 999){
              return
            }
            let swap = self.net[y][x]
            if (swap[2]){
              j++
              self.score = self.score + 10
              swap.pop()
            }
            if (!swap.length){
              x = 999
              return
            }
            self.snake.push(swap)
            self.head = swap
            self.net[y][x] = 100
            if (self.snake.length === j - 1){
              self.creatApple()
            }

            if (self.snake.length >= j) {
              let swap2 = self.snake[0]
              endY = swap2[1]
              endX = swap2[0]
              self.net[endX][endY] = swap2
              self.snake.shift()

            }
            self.sideChoose = false
            self.$forceUpdate()

                 }, i * 500);
               }(i));
          }
      },
    turn(side){
      if(this.sideChoose){
        return
      }
      if( this.right && side === 'left'){
        return
      }
      if( this.down && side === 'up'){
        return
      }
      if( this.up && side === 'down'){
        return
      }
      if( this.left && side === 'right'){
        return
      }
      this.right = (side === 'right')
      this.down = (side === 'down')
      this.up = (side === 'up')
      this.left = (side === 'left')
      this.sideChoose = true
    },
    creatApple(){
      let x = Math.floor(Math.random() * this.number)
      let y = Math.floor(Math.random() * this.number)
      this.apple = this.net[y][x] === 100 ? this.creatApple() : this.net[y][x]
      this.net[y][x].push(555)
    }
  },
  created() {
    const j = this.number
    for (let i = 0; i < j; i++) {
      var array = []
      for (var g = 0; g < j; g++) {
        let arr = []
        arr.push(i)
        arr.push(g)
        array.push(arr)
      }
      this.net.push(array)
    }

  },
  mounted() {
    this.createSnake()
    window.addEventListener('keydown', (e) => {
      // const kayArray = [3]
      if (e.key == 'ArrowUp') {
        this.turn('up')
      }
      if (e.key == 'ArrowLeft') {
        this.turn('left')
      }
      if (e.key == 'ArrowDown') {
        this.turn('down')
      }
      if (e.key == 'ArrowRight') {
        this.turn('right')
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
.squre_black {
  background-color: black;
}
td{
  height: 1px;
  width: 1px;
}
.box{
  align-content: center;
}
.joyStick{
  position: absolute;
  top: 400px;
}
</style>