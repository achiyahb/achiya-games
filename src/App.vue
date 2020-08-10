<template>
  <v-app>


    <v-main>
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
    this.$vuetify.rtl = true
  }
};
</script>
