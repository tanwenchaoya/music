<template>
  <transition @enter="enter" @leave="leave">
  <div class="mini-player" v-show="this.isShowMiniPlayer">
    <div class="player-wrapper">
      <div class="player-left" @click="showMusic">
        <img :src="currentSong.picUrl" alt="">
        <div class="player-title">
          <h3>{{currentSong.name}}</h3>
          <p>{{currentSong.singer}}</p>
        </div>
      </div>
      <div class="player-right">
        <div class="play" @click="playOrPause" ref="play"></div>
        <div class="list" @click.stop="showList"></div>
      </div>
    </div>
    <div class="mask" v-show="this.isShowMask" ref="mask"></div>
  </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'MiniPlayer',
  methods: {
    showList () {
      this.$refs.mask.style.top = (-document.body.clientHeight - 130) + 'px'
      this.setMask(true)
      this.setListPlayer(true)
    },
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setPlayOrPause',
      'setListPlayer',
      'setMask'
    ]),
    showMusic () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceDownIn', { duration: 600 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 300 }, function () {
        done()
      })
    },
    playOrPause () {
      this.setPlayOrPause(!this.isPlayOrPause)
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlayOrPause',
      'currentSong',
      'isShowMask'
    ])
  },
  watch: {
    isPlayOrPause (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.mini-player{
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  height: 130px;
  .player-wrapper{
    height: 100%;
    width: 100%;
    display: flex;
    @include bg_color();
    justify-content: space-between;
    align-items: center;
    .player-left{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 30px;
      img{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .player-title{
        p{
          @include font_size($font_samll);
          color: #fff;
        }
        h3{
          color: #fff;
        }
      }
    }
    .player-right{
      display: flex;
      align-items: center;
      .play{
        width: 75px;
        height: 75px;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .list{
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list')
      }
    }
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 130px;
    z-index: 999;
    background: #000;
    opacity: 0.4;
  }
}

</style>
