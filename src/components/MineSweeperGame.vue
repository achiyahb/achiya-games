<template>
  <div>
    <h4 v-if="gameOver">game over</h4>
    <h2 v-if="win">you win!!!</h2>
    <div>
      <div>
    <span
        :class="`rounded-r-lg ${plus? 'grey lighten-1':'grey lighten-2'}`"
        style="padding: 2px 9px 2px 9px;"
        @click="changeSize(1)"
    >+</span>
    <span
        :class="`rounded-l-lg ${!plus? 'grey lighten-1':'grey lighten-2'}`"
        style="padding: 2px 9px 2px 9px;"
        @click="changeSize(-1)"
    >-</span>
    </div>
    </div>
      <div style="display: flex">
        <span>cover square: {{ squareNum - revealSquare }}, flags: {{ flags }} </span>
        <v-spacer></v-spacer>
        <span>time- </span>
        <timer :start="start" :stop="gameOver"/>
      </div>



    <div dir="ltr" :style="`width: ${width}rem; display: grid;grid-template-columns: repeat(${number}, 1fr);border-style: solid;`">
      <div v-for="(row,xKey) of net" class="box">
        <div
            :class="col[1] === 'flag' ? 'flag' : col[1] !== 'show' ? 'square' : col[0] === 'M' ? 'mine' : ''"
            v-for="(col,yKey) of row"
            @click="choose(yKey,xKey)"
            @contextmenu.prevent="flag(yKey,xKey)"
            style="align-content: center;"
        >
          <div
              :class="(col[1] !== 'show')?((yKey+xKey)%2 !== 0 ? 'green darken-1':'green lighten-1') : col[1] !== 'show' ? '' : col[0] === 'M' ? 'mine' : ((yKey+xKey)%2 !== 0 ? 'grey lighten-4':'grey lighten-5')"

              :style="`text-align: center; width: ${width/number}rem; height: ${width/number}rem;`"

          >
            <span> {{ col[1] === 'flag' ? '' : (col[1] === 'show' && col[0] !== 'cl' && col[0] !== 'M') ? col[0] : '' }}
             <v-img v-if="col[1] === 'flag'" class="icon" :src="require('../assets/redflag.png')"></v-img>
          <v-img v-if="col[0] === 'M' && col[1] === 'show'" class="icon" :src="require('../assets/mine.svg')"></v-img>
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Timer from "@/components/tools/timer";
export default {
  name: "snakeGame",
  components: {Timer},
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
    win: false,
    width: null,
    mineNumber: null,
    plus: false
  }),
  methods: {
    choose(xKey, yKey) {
      if (this.net[yKey][xKey][1] === 'flag' || this.net[yKey][xKey][1] === 'show' || this.gameOver) {
        return
      }
      if (!this.start) {
        this.creatClearArea(xKey, yKey)
        this.creatMines()
        this.setNumbers()
        this.start = true
      }
      if (this.net[yKey][xKey] === 'cl') {
        this.RevealClear(xKey, yKey)
      } else {
        this.RevealExist(xKey, yKey)
        if (this.net[yKey][xKey][0] === 'M') {
          this.gameOver = true
        }
      }
      this.$forceUpdate()
    },
    creatClearArea(xKey, yKey) {
      const j = this.number
      for (let y = yKey - 1; y <= yKey + 1; y++) {
        for (let x = xKey - 1; x <= xKey + 1; x++) {
          if (y < 0 || y >= j) continue
          if (x < 0 || x >= j) continue
          this.net[y][x] = 'clear'
        }
      }
    },
    creatMines() {
      const self = this
      let i = 0;
      this.mineNumber = Math.floor(this.squareNum * 15 / 100) + 1
      while (i < this.mineNumber) {
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
          if (self.net[y][x] === 'M') {
            continue
          }
          let counter = 0
          for (let i = -1; i < 2; i++) {
            if (y === 0 || x === 0 && (i === -1 || i + x === j)) {
              continue
            }
            let num = self.net[y - 1][x + i] ? self.net[y - 1][x + i] : 'null'
            if (num === 'M') {
              counter++
            }
          }
          for (let k = -1; k < 2; k++) {
            if (x === 0 && (k === -1 || k + x === j)) {
              continue
            }
            let num = self.net[y][x + k] ? self.net[y][x + k] : 'null'
            if (num === 'M') {
              counter++
            }
          }
          for (let g = -1; g < 2; g++) {
            if (y + 1 == j || x === 0 && (g === -1 || g + x == j)) {
              continue
            }
            if (y === this.number - 1) {
              console.log([x, y])
            }
            let num = self.net[y + 1][x + g] ? self.net[y + 1][x + g] : 'null'
            if (num === 'M') {
              counter++
            }
          }
          self.net[y][x] = (counter !== 0 ? counter : 'cl')
        }

      }
    },
    setGame() {
      this.width = 20
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
    RevealExist(xKey, yKey) {
      const arrayReveal = []
      arrayReveal.push(this.net[yKey][xKey])
      arrayReveal.push('show')
      this.net[yKey][xKey] = arrayReveal
      if (this.net[yKey][xKey][0] !== 'M') this.revealSquare++
      if (this.squareNum - this.revealSquare === this.mineNumber) {
        this.gameOver = true
        this.win = true
      }
    },
    RevealClear(xKey, yKey) {
      const self = this
      const j = this.number
      for (let y = yKey - 1; y <= yKey + 1; y++) {
        for (let x = xKey - 1; x <= xKey + 1; x++) {
          if (y < 0 || y >= j) continue
          if (x < 0 || x >= j) continue
          if (self.net[y][x][1] === 'show' || self.net[y][x][1] === 'flag') continue
          self.RevealExist(x, y)
          if (self.net[y][x][0] === 'cl') {
            self.RevealClear(x, y)
          }
        }
      }
    },

    flag(xKey, yKey) {
      if (!this.start || this.gameOver || this.net[yKey][xKey][1] === 'show') return
      if (this.net[yKey][xKey][1] !== 'flag') {
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
    },
    changeSize(i) {
      this.width = this.width + 2*i
      if (i === -1){
        this.plus = false
      } else {
        this.plus = true
      }
    }
  },
  mounted() {
    this.setGame()
  }

}
</script>

<style scoped>
.mine {
  background-color: red;
}

.icon {
  size: 5rem;
}
</style>
