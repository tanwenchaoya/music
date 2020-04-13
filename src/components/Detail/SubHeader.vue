<template>
  <div class="header" @click="change">
    <div class="header-left" @click.stop="back"></div>
    <p class="title">{{title}}</p>
    <div class="header-right"></div>
  </div>
</template>

<script>

export default {
  name: 'SubHeader',
  data: function () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    change () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    back () {
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
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
  background: red;
  position: relative;
  z-index: 999;
  @include bg_color();
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
    line-height: 100px;
    text-align: center;
    @include font_size($font_medium);
    color: #fff;
    //font-weight: bold;
    @include no-wrap();

  }
}
</style>
