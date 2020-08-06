<template>
   <v-container >
  <div class="home">
<h1> איקס עיגול</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
   </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/circleAndExes.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
