<template>
  <div>
    <h4 v-if="gameOver">המשחק נגמר</h4>
    <h2 v-if="win">ניצחת!!!</h2>
    <span>משבצות מכוסות: {{squareNum-revealSquare}}, מספר דגלים: {{flags}}  </span>
    <v-simple-table style="width: 520px; align-content: center; border-color: black" dir="ltr">
      <tbody>
      <tr v-for="(row,yKey) of net" style="border-color: black;">
        <td
            :class="col[1] === 'flag' ? 'flag' : col[1] !== 'show' ? 'squre' : col[0] === 'M' ? 'mine' : ''"
            v-for="(col,xKey) of row"
            @click="choose(xKey,yKey)"
            @contextmenu.prevent="flag(xKey,yKey)"
            style="width: 1px; height: 40px; align-content: center; font-size: 1rem; border-color: black;"
        >
{{col[1] === 'flag' ? '' : (col[1] === 'show' && col[0] !== 'cl' && col[0] !== 'M') ? col[0] : ''}}
          <v-img v-if="col[1] === 'flag'" class="icon" :src="require('../assets/redflag.png')" ></v-img>
          <v-img v-if="col[0] === 'M' && col[1] === 'show'" class="icon" :src="require('../assets/mine.svg')" ></v-img>
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "snakeGame",
  props: ['number'],
  data: () => ({
    start: false,
    score: 0,
    sideChoose: false,
    net: [],
    gameOver: false,
    squareNum: null,
    revealSquare: null,
    flags: 0,
    win: false
  }),
  methods: {
    choose(xKey,yKey){
      if (this.net[yKey][xKey][1] === 'flag' || this.net[yKey][xKey][1] === 'show' || this.gameOver){
        return
      }
      if (!this.start){
        this.creatClearArea(xKey,yKey)
        this.creatMines()
        this.setNumbers()
        this.start = true
      }
      if (this.net[yKey][xKey] === 'cl'){
        this.RevealClear(xKey,yKey)
      } else {
        this.RevealExist(xKey,yKey)
        if (this.net[yKey][xKey][0] === 'M'){
          this.gameOver = true
        }
      }
      this.$forceUpdate()
    },
    creatClearArea(xKey,yKey){
      const j = this.number
        for (let y = yKey-1; y <= yKey+1; y++) {
          for (let x = xKey-1; x <= xKey+1; x++){
            if (y < 0 || y >= j) continue
            if (x < 0 || x >= j) continue
          this.net[y][x] = 'clear'
        }
      }
    },
    creatMines() {
      const self = this
      let i = 0;
      while (i < 15) {
        let x = Math.floor(Math.random() * this.number)
        let y = Math.floor(Math.random() * this.number)
        if (this.net[y][x] === 'M' || this.net[y][x] === 'clear') {
          continue
        }
        self.net[y][x] = 'M'
        i++
      }

    },
    setNumbers() {
      const self = this
      const j = this.number
      for (let x = 0; x < j; x++) {
        for (let y = 0; y < j; y++) {
          if (x===9 && y===9){
            console.log(x)
          }
          if (self.net[y][x] === 'M') {
            continue
          }
          let counter = 0
          for (let i = -1; i < 2; i++) {
            if (y===0 || x===0 && (i === -1 || i+x === j)){
              continue
            }
            let num = self.net[y - 1][x+i] ? self.net[y - 1][x+i] : 'null'
            if (num === 'M') {
              counter++
            }
          }
          for (let k = -1; k < 2; k++) {
            if (x===0 && (k === -1 || k+x === j)){
              continue
            }
            let numY = self.net[y][x+k]
            let num = self.net[y][x+k]? self.net[y][x+k] : 'null'
            if (num === 'M') {
              counter++
            }
          }
          for (let g = -1; g < 2; g++) {
            if (y + 1 === j || x === 0 && (g === -1 || g + x === j)) {
              continue
            }
            let numZ = self.net[y + 1][x + g]
            let num = self.net[y + 1][x + g] ? self.net[y + 1][x + g] : 'null'
            if (num === 'M') {
              counter++
            }
          }
          self.net[y][x] = (counter !== 0 ? counter : 'cl')
        }

      }
      console.log(self.net)
    },
    setGame() {
      const self = this
      const j = this.number
      for (let i = 0; i < j; i++) {
        var array = []
        for (var g = 0; g < j; g++) {
          let arr = []
          arr.push(i)
          arr.push(g)
          array.push(arr)
          self.squareNum++
        }
        this.net.push(array)
      }
    },
    RevealExist(xKey,yKey){
      const arrayReveal = []
      arrayReveal.push(this.net[yKey][xKey])
      arrayReveal.push('show')
      this.net[yKey][xKey] = arrayReveal
      if(this.net[yKey][xKey][0] !== 'M') this.revealSquare++
      if (this.squareNum - this.revealSquare === 15){
        this.gameOver = true
        this.win = true
      }
    },
    RevealClear(xKey,yKey) {
        const self = this
        const j = this.number
        for (let y = yKey-1; y <= yKey+1; y++) {
          for (let x = xKey-1; x <= xKey+1; x++){
            if (y < 0 || y >= j) continue
            if (x < 0 || x >= j) continue
            if (self.net[y][x][1] === 'show' || self.net[y][x][1] === 'flag') continue
              self.RevealExist(x,y)
            if (self.net[y][x][0] === 'cl'){
              self.RevealClear(x,y)
            }
          }
        }
    },

  flag(xKey,yKey){
      if (!this.start || this.gameOver || this.net[yKey][xKey][1] === 'show') return
    if (this.net[yKey][xKey][1] !== 'flag'){
      const arrayReveal = []
      arrayReveal.push(this.net[yKey][xKey])
      arrayReveal.push('flag')
      this.net[yKey][xKey] = arrayReveal
      this.flags++
    } else {
      this.net[yKey][xKey].pop()
      let swap = this.net[yKey][xKey][0]
      this.net[yKey][xKey] = swap
      this.flags--
    }
    this.$forceUpdate()
  }
  },
  mounted() {
    this.setGame()
  }

}
</script>

<style scoped>
.squre {
  background-color: aquamarine;
  border: 1px black;
}

td{
  height: 1px;
  width: 1px;
}
.box{
  align-content: center;
}


.mine{
  background-color: red;
}
.tey{
  color: yellow;
}
.flag{
  background-color: yellow;
}
.icon{
  height: 20px;
  width: 20px;
  position: absolute;
}
</style>
