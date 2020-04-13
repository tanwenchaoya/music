<template>
  <div class="header">
    <div class="header-left" @click="hiddenMusic"></div>
    <div class="header-title">
      <p>{{currentSong.name}}</p>
      <p>{{currentSong.singer}}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions(['setFullScreen', 'setMiniPlayer']),
    hiddenMusic () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  },
  computed: {
    ...mapGetters(['currentSong'])
  }

}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .header{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    //background: #f0ad4e;
    .header-left,.header-right{
      height: 84px;
      width: 84px;
      margin-top: 8px;
    }
    .header-left{
      @include bg_img("../../assets/images/down");
    }
    .header-right{
    }
    .header-title{
      p{
        &:nth-of-type(1){
          @include font_size($font_medium);
        }
        &:nth-of-type(2){
          @include font_size($font_medium_s);
        }
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #fff;
      @include no-wrap();
    }
  }
</style>
