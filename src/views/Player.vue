<template>
<div class="player">
<NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
  <MiniPlayer></MiniPlayer>
  <ListPlayer ref="listPlayer"></ListPlayer>
  <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
</div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import modeType from '../store/modeType'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  methods: {
    ...mapActions(['setPlaySong', 'setPlayOrPause', 'setLocalFavoriteList', 'setFavoriteList', 'setHistoryList', 'setLocalHistoryList']),
    timeupdate (e) {
      this.currentTime = e.target.currentTime
    },
    end () {
      console.log(this.playMode)
      if (this.playMode === modeType.loop) {
        this.setPlaySong(this.currentIndex + 1)
        this.setPlayOrPause(true)
      } else if (this.playMode === modeType.one) {
        this.$refs.audio.play()
        this.setPlayOrPause(true)
      } else if (this.playMode === modeType.random) {
        let index = this.getRandomIndex(0, this.songDetail.length - 1)
        this.setPlaySong(index)
        this.setPlayOrPause(true)
      }
    },
    getRandomIndex (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlayOrPause',
      'currentIndex',
      'curTime',
      'playMode',
      'songDetail',
      'favoriteList',
      'historyList'
    ])
  },
  watch: {
    isPlayOrPause (newValue, oldValue) {
      if (newValue) {
        console.log(newValue)
        this.setHistoryList(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex (newValue, oldValue) {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlayOrPause) {
          this.$refs.audio.play()
          this.setHistoryList(this.currentSong)
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
      console.log(newValue)
    },
    favoriteList (newValue, oldValue) {
      window.localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
    },
    historyList (newValue, oldValue) {
      window.localStorage.setItem('historyList', JSON.stringify(newValue))
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  created () {
    let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    if (favoriteList === null) {
      return
    }
    this.setLocalFavoriteList(favoriteList)
    let historyList = JSON.parse(window.localStorage.getItem('historyList'))
    if (historyList === null) {
      return
    }
    this.setLocalHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  }
}
</script>

<style scoped>

</style>
