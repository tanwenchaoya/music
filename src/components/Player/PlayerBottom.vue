<template>
<div class="player-bottom">
  <div class="progress">
    <span ref="eleCurrentTime">00:00</span>
    <div class="progress-bar" ref="progressBar" @click.stop="progressClick">
      <div class="progress-line" ref="progressLine">
        <div class="progress-dot" ref="progressDot"></div>
      </div>
    </div>
    <span ref="eleTotalTime"></span>
  </div>
  <div class="control">
    <div class="mode" @click="mode" ref="mode"></div>
    <div class="prev" @click="prev"></div>
    <div class="play" @click="playOrPause" ref="play"></div>
    <div class="next" @click="next"></div>
    <div class="favorite" @click="favorite" :class="{'active':isFavorite()}"></div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions(['setPlayOrPause', 'setPlayMode', 'setPlaySong', 'setCurTime', 'setFavoriteList']),
    playOrPause () {
      this.setPlayOrPause(!this.isPlayOrPause)
    },
    mode () {
      if (this.playMode === modeType.loop) {
        this.setPlayMode(modeType.one)
      } else if (this.playMode === modeType.one) {
        this.setPlayMode(modeType.random)
      } else {
        this.setPlayMode(modeType.loop)
      }
    },
    prev () {
      this.setPlaySong(this.currentIndex - 1)
    },
    next () {
      this.setPlaySong(this.currentIndex + 1)
    },
    formatTime (time) {
      let minute = Math.floor(time / 60)
      minute = minute >= 10 ? minute : '0' + minute
      let second = Math.floor(time % 60)
      second = second >= 10 ? second : '0' + second
      return {
        minute: minute,
        second: second
      }
    },
    progressClick (e) {
      let normalLeft = this.$refs.progressBar.offsetLeft
      let eventLeft = e.pageX
      let clickLeft = eventLeft - normalLeft
      let progressWidth = this.$refs.progressBar.offsetWidth
      let value = clickLeft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'

      let curTime = value * this.totalTime
      this.setCurTime(curTime)
    },
    favorite () {
      let index = this.favoriteList.indexOf(this.currentSong)
      console.log(index)
      if (index > -1) {
        this.favoriteList.splice(index, 1)
      } else {
        this.setFavoriteList(this.currentSong)
      }
    },
    isFavorite () {
      let result = this.favoriteList.find((value) => {
        return value.id === this.currentSong.id
      })
      return result
    }
  },
  computed: {
    ...mapGetters(['isPlayOrPause', 'playMode', 'currentIndex', 'currentSong', 'favoriteList'])
  },
  watch: {
    isPlayOrPause (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    playMode (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    totalTime (newValue, oldValue) {
      let time = this.formatTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    currentTime (newValue, oldValue) {
      let time = this.formatTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      let current = (newValue / this.totalTime * this.$refs.progressBar.clientWidth + 'px')
      this.$refs.progressLine.style.width = current
      if (newValue === this.totalTime) {
        this.setPlayOrPause(false)
      }
    }
  },
  /* mounted () {
    console.log(this.totalTime)
    let time = this.formatTime(this.totalTime)
    this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
  }, */
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
  @import "../../assets/css/variable";
  .player-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .progress{
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        @include font_size($font_samll);
        @include font_color();
      }
      .progress-bar{
        width: 100%;
        margin: 0 10px;
        height: 10px;
        background: #fff;
        .progress-line{
          background: #f0ad4e;
          width: 0;
          height: 10px;
          position: relative;
          .progress-dot{
            position: absolute;
            height: 20px;
            width: 20px;
            background: #fff;
            border-radius: 100%;
            top: 50%;
            transform: translateY(-50%);
            left: 100%;
          }
        }
      }
    }
    .control{
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 50px 0;
      box-sizing: border-box;
      div{
        height: 75px;
        width: 75px;
      }
      .mode{

          @include bg_img('../../assets/images/loop');

        &.one{
          @include bg_img('../../assets/images/one');
        }
        &.random{
          @include bg_img('../../assets/images/shuffle');
        }
      }
      .prev{
        @include bg_img('../../assets/images/prev')
      }
      .play{
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .next{
        @include bg_img('../../assets/images/next');
      }
      .favorite{
        @include bg_img('../../assets/images/un_favorite');
        &.active{
          @include bg_img('../../assets/images/favorite');
        }
      }
    }
  }

</style>
