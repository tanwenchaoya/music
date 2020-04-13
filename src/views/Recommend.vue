<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelect" :type="'personalized'"></Personalized>
        <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelect" :type="'albums'"></Personalized>
        <songList :songs="songs"></songList>
      </div>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import songList from '../components/Recommend/songList'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Recommend',
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created () {
    getBanner()
      .then((data) => {
        this.banners = data.banners
      })
      .catch(function (err) {
        console.log(err)
      })
    getPersonalized()
      .then((data) => {
        this.personalized = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewAlbum()
      .then((data) => {
        this.albums = data.albums.splice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewSong()
      .then((data) => {
        this.songs = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  components: {
    Banner,
    Personalized,
    songList,
    ScrollView
  },
  methods: {
    fatherSelect (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.recommend{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.v-enter{
  transform: translateY(100%);
}
.v-enter-to{
  transform: translate(0%,0%);
}
.v-enter-active{
  transition: transform 0.5s;
}
.v-leave{
  transform: translate(0%,0%);
}
.v-leave-to{
  transform: translateY(100%);
}
.v-leave-active{
  transition: transform 0.3s;
}
</style>
