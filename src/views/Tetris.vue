<template>
  <div class="about">
    <v-btn v-if="!hide || !start" @click="start = !start; hide = true;">{{ start ? 'סיים' : 'התחל' }}</v-btn>
    <tetris v-if="start" v-on:childToParent="hide = false"/>
  </div>
</template>
<script>
import tetris from '@/components/TetrisGame.vue'
export default {
  components: {tetris},
  data: () => ({
    start: false,
    hide: false
  })
}
</script>
