<template>
    <div class="personalized">
      <div class="personalized-top">
        <h3>{{title}}</h3>
      </div>
      <div class="personalized-list">
        <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
          <p class="playCount" v-if="value.playCount/10000>10000" v-html="Math.round(value.playCount/100000000)+'亿'"></p>
          <p class="playCount" v-else-if="value.playCount/10000>1" v-html="Math.round(value.playCount/10000)+'万'"></p>
          <!--<img :src="value.picUrl" alt="" >-->
          <img v-lazy="value.picUrl" alt="" >
          <p v-html="value.name"></p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    selectItem (id) {
      this.$emit('select', id, this.type)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.personalized{
  @include bg_sub_color();
  border-bottom: 1px solid #ddd;
  .personalized-top{
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
  .personalized-list{
    padding: 20px 0 0 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .item{
      width: 200px;
      margin-bottom: 20px;
      position: relative;
      img{
        height: 200px;
        width: 200px;
        border-radius: 20px;
      }
      p{
        @include clamp(2);
        @include font_size($font_medium_s);
        @include font_color();
      }
      .playCount{
        position: absolute;
        @include font_size($font_samll);
       color: #fff;
        top: 10px;
        right: 10px;
      }
    }
  }
}
</style>
