<template>
  <div class="about">
    <!--    <v-container>-->
    <!--    <v-row>-->
    <!--    <v-col-->
    <!--        col="3"-->
    <!--    >-->
    <!--    <v-text-field v-if="!hide|| !start" @change="start = false" v-model="number"></v-text-field>-->
    <!--    </v-col>-->
    <!--    </v-row>-->
    <!--    </v-container>-->
    <v-btn v-if="!hide || !start" @click="start = !start; hide = true;">{{ start ? 'stop' : 'start' }}</v-btn>
    <snake-game v-if="start" :number="11" v-on:childToParent="hide = false"/>
  </div>
</template>
<script>
import SnakeGame from "@/components/snakeGame";
export default {
  components: {SnakeGame},
  data: () => ({
    start: false,
    hide: false
  })
}
</script>
