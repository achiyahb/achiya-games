<template>
  <v-container >
    <div>
      <h1>שולה מוקשים</h1>
      <v-btn @click="open = !open">{{open ? 'סגור' : 'פתח'}}</v-btn>
      <mine-sweeper-game v-if="open" :number="10"/>
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
    open: false
  })
}
</script>