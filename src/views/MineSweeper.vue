<template>
  <v-container >
    <div style="display: flex; flex-direction: column; align-items: center">
      <h1>mine-sweeper-game</h1>
      <v-btn @click="open = !open">{{open ? 'close' : 'open'}}</v-btn>
      <v-select
          style="margin-top: 2em"
          v-if="!open"
      v-model="squareNumber"
      :items="numbers"
                label="square number on a row:"
      ></v-select>
      <mine-sweeper-game
          style="margin-top: 2em"
          v-if="open"
          :number="squareNumber"/>
    </div>
  </v-container>
</template>

<script>
import MineSweeperGame from "@/components/MineSweeperGame";

export default {
  name: 'MineSweeper',
  components: {
    MineSweeperGame,
  },
  data: () => ({
    open: false,
    squareNumber: 11,
    numbers: [8,10,11,12,14,16]
  })
}
</script>

<style>

</style>
