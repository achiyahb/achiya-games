<template>
  <v-app>
    <v-main >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/circleAndExes';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
  created() {
    this.$vuetify.rtl = false
  }
};
</script>


<style>
.v-main {
  background-color: #ddd;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

}
.main{

}
</style>
