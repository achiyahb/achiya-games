<template>
  <div>
    <v-simple-table style="width: 520px; height: 400px; align-content: center" dir="ltr">
      <tbody>
      <tr v-for="(row,xKey) of net">
        <td
            :class="(col === 100 ) ? 'squre_black' : (col[2] === 555 ) ? 'squre_yellow' :'squre'"
            v-for="(col,yKey) of row"
            @click="choose(xKey,yKey)"
            style="width: 1px; height: 40px; align-content: center; font-size: 0.4rem"
        >
{{col}}
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
    creatMines() {
      const self = this
      let i = 0;
      while (i < 15) {
        let x = Math.floor(Math.random() * this.number)
        let y = Math.floor(Math.random() * this.number)
        if (this.net[y][x] == 'mine') {
          continue
        }
        self.net[y][x] = 'mine'
        i++
      }

    },
    setNumbers() {
      const self = this
      const j = this.number
      let newGroup = 0
      for (let x = 0; x < j; x++) {
        for (let y = 0; y < j; y++) {
          if (self.net[y][x] === 'mine') {
            continue
          }
          let counter = 0
          let group = undefined
          for (let i = -1; i < 2; i++) {
            if (y===0 || x===0 && (i === -1 || i+x === j)){
              continue
            }
            let numX = self.net[y - 1][x+i]
            let num = self.net[y - 1][x+i] ? self.net[y - 1][x+i] : 'null'
            if (num === 'mine') {
              counter++
            }
            if (num[0] === 'empty') {
              group = num[1]
            }
          }
          for (let k = -1; k < 2; k++) {
            if (x===0 && (k === -1 || k+x === j)){
              continue
            }

            let numY = self.net[y][x+k]
            let num = self.net[y][x+k]? self.net[y][x+k] : 'null'
            if (num === 'mine') {
              counter++
            }
            if (num[0] === 'empty') {
              group = num[1]
            }
          }
          for (let g = -1; g < 2; g++) {
            if (y+1 === j || x===0 && (g === -1 || g+x === j)){
              continue
            }
            let numZ = self.net[y + 1][x+g]
            let num = self.net[y + 1][x+g] ? self.net[y + 1][x+g]: 'null'
            if (num === 'mine') {
              counter++
            }
            if (num[0] === 'empty') {
              group = num[1]
            }
          }
          if(!group && group !== 0 && counter===0){
            group = newGroup
              newGroup++
          }

          counter = group ? [counter === 0 ?'empty':counter,group] : counter
          self.net[y][x] = (counter)
        }

      }
      console.log(self.net)
    },
    setGame() {
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
    }
  },
  mounted() {
    this.setGame()
    this.creatMines()
    this.setNumbers()
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

<style>
.ter{
  color: red;
}
.tey{
  color: yellow;
}
</style>
