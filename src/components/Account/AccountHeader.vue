<template>
  <div class="header" @click="change">
    <div class="header-left" @click.stop="back"></div>
    <ul class="title">
      <li :class="{'active':switchNum===0}" @click.stop="changeNum(0)">我喜欢的</li>
      <li :class="{'active':switchNum===1}" @click.stop="changeNum(1)">听歌排行</li>
    </ul>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AccountHeader',
  data: function () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  computed: {
    ...mapGetters(['switchNum'])
  },
  methods: {
    ...mapActions(['setSwitchNum']),
    back () {
      window.history.back()
    },
    change () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    changeNum (value) {
      this.setSwitchNum(value)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  @include bg_color;
  .header-left,.header-right{
    height: 84px;
    width: 84px;
    margin-top: 8px;
  }
  .header-left{
    @include bg_img("../../assets/images/back");
  }
  .header-right{
    @include bg_img("../../assets/images/more")
  }
  .title{
    display: flex;
    justify-content: space-between;
    line-height: 100px;
    @include font_size($font_samll);
    color: #fff;
    //font-weight: bold;
    @include no-wrap();
    li{
      padding: 0 10px;
      height: 55px;
      line-height: 55px;
      border: 1px solid #fff;
      border-radius: 15px;
      &.active{
        background: rgba(255,255,255,0.3);
      }
    }

  }
}
</style>
