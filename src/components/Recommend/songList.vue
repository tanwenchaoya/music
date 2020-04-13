<template>
    <div class="song">
      <div class="song-top">
        <h3>最新音乐</h3>
      </div>
      <div class="song-list">
        <ul>
          <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
            <!--<img :src="value.picUrl" alt="">-->
            <img v-lazy="value.picUrl">
            <div>
              <p>{{value.name}}</p>
              <p><span v-for="value2 in value.song.artists" :key="value2.id">{{value2.name+" "}}</span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'songList',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions(['setFullScreen', 'setMiniPlayer', 'setSongDetail']),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.song{
  @include bg_sub_color();
  .song-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    h3{
      padding: 0 20px;
      @include bg_sub_color();
      @include font_size($font_large);
    }
    border-bottom: 1px solid #ddd;
  }
  .song-list{
    padding-bottom: 130px;
    .item{
      width: 100%;
      height: 150px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      @include font_color();
      img{
        height: 100px;
        width: 100px;
        border-radius: 20px;
        margin-right: 30px;
      }
      p{
        &:nth-of-type(1){
          @include font_size($font_medium);
          margin-bottom: 15px;
        }
        &:nth-of-type(2){
          @include font_size($font_medium_s);
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
