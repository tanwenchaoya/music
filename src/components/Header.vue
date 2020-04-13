<template>
  <div class="header" @click="change">
    <div class="header-left"></div>
    <p class="title">Music</p>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  background: red;
  @include bg_color();
  .header-left,.header-right{
    height: 84px;
    width: 84px;
    margin-top: 8px;
    //background: #0c0c0c;
  }
  .header-left{
    @include bg_img("../assets/images/logo");
  }
  .header-right{
    @include bg_img("../assets/images/account")
  }
  .title{
    line-height: 100px;
    text-align: center;
    @include font_size($font_large);
    color: #fff;
    font-weight: bold;

  }
}
</style>
