<template>
  <v-container >
    <div class="home">
      <h1>tic tac toe</h1>
      <circle-and-exes/>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import circleAndExes from '@/components/circleAndExes.vue'

export default {
  name: 'XAndO',
  components: {
    circleAndExes
  }
}
</script>
