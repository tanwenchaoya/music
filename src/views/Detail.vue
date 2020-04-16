<template>
 <div class="detail">
   <SubHeader :title="playlist.name"></SubHeader>
   <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>

     <div class="bottom">
       <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
       </ScrollView>
     </div>
 </div>
</template>

<script>
import { getPlayList, getAlbum, getArtistsSong } from '../api/index'
import SubHeader from '../components/Detail/SubHeader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Detail',
  data () {
    return {
      playlist: {}
    }
  },
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  created () {
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = data.playlist
        })
        .catch(function (err) {
          console.log(err)
        })
    } else if (this.$route.params.type === 'albums') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') {
      getArtistsSong({ id: this.$route.params.id })
        .then((data) => {
          console.log(data)
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  mounted () {
    let defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollview.scrollIng((offsetY) => {
      if (offsetY > 0) {
        let scale = 1 + offsetY / defaultHeight
        this.$refs.top.$el.style.transform = 'scale(' + scale + ')'
      } else {
        let scale = 0.8 * Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeMask(scale)
        if (Math.abs(offsetY) >= 662) {
          this.$refs.top.$el.style.opacity = 0
        } else {
          this.$refs.top.$el.style.opacity = 1
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
.detail{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .bottom{
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 66;
  }

}
</style>
