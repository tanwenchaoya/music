<template>
    <div class="detail-bottom">
      <ul>
        <li class="bottom-top" @click="selectAll">
          <div class="bottom-icon"></div>
          <div class="bottom-title">播放全部</div>
        </li>
        <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic(value.id)">
          <div>
            <p class="songname">{{value.name}}</p>
            <p class="songxx">{{value.al.name}}-{{value.ar[0].name}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail',
      'setPlayOrPause'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
      this.setPlayOrPause(false)
    },
    selectAll () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setPlayOrPause(false)
      let ids = this.playlist.map(function (item) {
        return item.id
      })
      this.setSongDetail([ids])
    }
  },
  computed: {
    ...mapGetters(['isPlayOrPause'])
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.detail-bottom{
  width: 100%;
  position: relative;
  li{
    width: 100%;
    height: 120px;
    @include bg_sub_color();
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
  }
  .bottom-top{
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon{
      height: 60px;
      width: 60px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 30px;
    }
    .bottom-title{
      @include font_color();
      @include font_size($font_large)
    }
  }
  .item{
    display: flex;align-items: center;
    .songname{
      margin-bottom: 10px;
      @include font_size($font_medium);
      @include font_color();
      @include no-wrap();
    }
    .songxx{
      @include font_size($font_samll);
      @include font_color();
      opacity: 0.7;
      @include no-wrap();
    }
  }

}
</style>
