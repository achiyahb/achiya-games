<template>
  <div>

    <span
        :state="timerState"
    >
      {{formattedTime}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'timer',
  props: ['start','stop'],
  data () {
    return {
      timerState: 'stopped',
      currentTimer: 0,
      formattedTime: "00:00:00",
      ticker: undefined,
      laps: [],
      latestLap: "",
      snackbar: false
    }
  },
  methods: {
    startTime() {
      if (this.timerState !== 'running') {
        this.tick();
        this.timerState = 'running';
      }
    },
    stopTime() {
        window.clearInterval(this.ticker);
        this.timerState = 'paused';
    },
    tick () {
      this.ticker = setInterval(() => {
        this.currentTimer++;
        this.formattedTime = this.formatTime(this.currentTimer);
      }, 1000)
    },
    formatTime (seconds) {
      let measuredTime = new Date(null);
      measuredTime.setSeconds(seconds);
      let MHSTime = measuredTime.toISOString().substr(11, 8);
      return MHSTime;
    }
  },
  watch:{
    start(){
      if(this.start) this.startTime()
    },
    stop(){
      if(this.stop) this.stopTime()
    }
  }
}
</script>

<!--<template>-->
<!--  <v-container fluid>-->
<!--    <v-layout>-->
<!--      <v-flex xs12 pa-3>-->
<!--        <v-card>-->
<!--          <v-card-title class="secondary white&#45;&#45;text font-weight-light display-2 text-uppercase justify-center">-->
<!--            {{ timer }}-->
<!--          </v-card-title>-->
<!--          <v-card-text>-->
<!--            <v-list>-->
<!--              <v-list-tile-->
<!--                  class="success mb-3"-->
<!--                  @click="$emit('start')"-->
<!--                  :disabled="state == 'running'"-->
<!--              >-->
<!--                <span class="white&#45;&#45;text font-weight-bold text-uppercase">Start</span>-->
<!--              </v-list-tile>-->
<!--              <v-list-tile-->
<!--                  class="info mb-3"-->
<!--                  @click="$emit('lap')"-->
<!--                  :disabled="state == 'stopped' || state == 'paused'"-->
<!--              >-->
<!--                <span class="white&#45;&#45;text font-weight-bold text-uppercase">Lap</span>-->
<!--              </v-list-tile>-->
<!--              <v-list-tile-->
<!--                  class="warning mb-3"-->
<!--                  @click="$emit('pause')"-->
<!--                  :disabled="state == 'stopped' || state == 'paused'"-->
<!--              >-->
<!--                <span class="white&#45;&#45;text font-weight-bold text-uppercase">Pause</span>-->
<!--              </v-list-tile>-->
<!--              <v-list-tile-->
<!--                  class="error"-->
<!--                  @click="$emit('stop')"-->
<!--                  :disabled="state == 'stopped'"-->
<!--              >-->
<!--                <span class="white&#45;&#45;text font-weight-bold text-uppercase">Stop</span>-->
<!--              </v-list-tile>-->
<!--            </v-list>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-flex>-->
<!--    </v-layout>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Timer',-->
<!--  props: ['timer', 'state']-->
<!--}-->
<!--</script>-->
