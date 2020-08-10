<template>
   <v-container >
  <div class="home">
<h1>ברוכים הבאים</h1>
     <div>
    <v-btn @click="$router.push('/snake')">סנייק</v-btn>
     </div>
    <div>
      <v-btn @click="$router.push('/x-and-o')">איקס עיגול</v-btn>
    </div>
    <div>
      <v-btn @click="$router.push('/mine-sweeper')">שולה מוקשים</v-btn>
    </div>
    <div>
      <span>בפיתוח</span>
      <v-btn @click="$router.push('/tetris')">טטריס</v-btn>
    </div>
  </div>
   </v-container>
</template>

<script>

export default {
  name: 'Home',

}
</script>
