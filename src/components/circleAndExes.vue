<template>
  <v-container>
  <div>
    <span :class="!circle ? 'ter' :'tey'">{{circle?'תור העיגול':'תור האיקס'}}</span>
    <h1 v-if="winner" >המנצח הוא {{winner}}</h1>
  </div>
    <v-row class="text-center" v-for="(array,key) of x">
      <v-col
          cols="4"
          v-for="num of array"
      >
        <v-card :class="num[1]==='X'?'red':num[1]==='O'?'yellow':''">
          <v-card-text :class="num[1] ? '' : 'white--text'" @click="chooseTurn(key , num)">
           {{num.length ? num[1] :'t'}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-btn @click="clear()">אפס</v-btn>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      x: [1,2,3],
      circle: false,
      winner: null,
      numTurn: 0
    }),
    methods: {
      chooseTurn(key, num) {
        if(this.x[key][num - 1].length){
          return
        }
        this.x[key][num - 1] = [num, !this.circle ? 'X' : 'O']
        this.circle = !this.circle
        this.numTurn++
        if (this.numTurn > 4) {
          this.check()
        }
      },

      check() {
        for (let i in this.x) {
          if (this.x[i][0][1] === this.x[i][1][1] && this.x[i][1][1] === this.x[i][2][1] && this.x[i][1][1]) {
            this.winner = this.x[i][1][1]
          }
        }
        for (let i in this.x) {
          if (this.x[0][i][1] === this.x[1][i][1] && this.x[1][i][1] === this.x[2][i][1] && this.x[2][i][1]) {
            this.winner = this.x[0][i][1]
          }
        }
        if (this.x[0][0][1] === this.x[1][1][1] && this.x[2][2][1] === this.x[1][1][1] && this.x[1][1][1]) {
          this.winner = this.x[1][1][1]
        }
        if (this.x[2][0][1] === this.x[1][1][1] && this.x[1][1][1] === this.x[0][2][1] && this.x[0][2][1]) {
          this.winner = this.x[1][1][1];
        }
      },
      clear(){
        this.restartSystem()
      },
      restartSystem() {
        this.circle = false
        this.winner = null
        let length = this.x.length
        for (let i = 0; i < length; i++) {
          let y = [1, 2, 3]
          this.x[i] = y
        }
      }
    },

    created() {
      let length = this.x.length
      for (let i = 0; i < length; i++){
        let y = [1,2,3]
        this.x[i] = y
      }
    }
  }
</script>

<style>
  .ter{
    color: red;
  }
  .tey{
    color: yellow;
  }
</style>
