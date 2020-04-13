<template>
  <div class="tabbar">
    <router-link tag="div" class="item" to="/recommend">推荐</router-link>
    <router-link tag="div" class="item" to="/singer">歌手</router-link>
    <router-link tag="div" class="item" to="/rank">排行</router-link>
    <router-link tag="div" class="item" to="/search">搜索</router-link>
  </div>

</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
  .tabbar{
    width: 100%;
    height: 84px;
    @include bg_sub_color();
    display: flex;
    justify-content: space-around;
    .item{
        line-height: 84px;
        @include font_size($font_medium);
        @include font_color();
      &.router-link-active{
        @include font_active_color();
        @include border_color();
      }
    }
  }

</style>
