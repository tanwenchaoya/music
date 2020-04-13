<template>
  <transition  @enter="enter" @leave="leave">
<div class="normal-player" v-show="this.isFullScreen" ref="normalPlayer">
  <div class="normal-body">
    <PlayerHeader></PlayerHeader>
    <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
    <PlayerBottom :totalTime = totalTime :currentTime="currentTime"></PlayerBottom>
  </div>
  <div class="player-bg">
    <img :src="currentSong.picUrl" alt="">
  </div>
</div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions(['setLyric']),
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 300 }, function () {
        done()
      })
    }
  },
  watch: {
    currentSong (newValue, oldValue) {
      if (newValue.id === undefined) {
        return
      }
      this.setLyric(newValue.id)
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
.normal-player{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  .normal-body{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    img{
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      filter: blur(80px);
    }
  }
}
</style>
