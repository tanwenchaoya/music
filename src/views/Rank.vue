<template>
<div class="rank">
<ScrollView>
  <ul>
    <li v-for="(value,key) in category.titles" :key="key" class="group">
      <h3 class="group-title">{{value}}</h3>
      <ul class="normal-group" v-if="value === '官方榜'">
        <li v-for="(obj) in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.id)">
          <div class="rank-left">
            <img v-lazy="obj.rank.coverImgUrl">
            <p>{{obj.rank.updateFrequency}}</p>
          </div>
          <div class="rank-right">
            <p v-for="(song,index) in obj.rank.tracks" :key="song.first">
              {{index}}.{{song.first}}-{{song.second}}
            </p>
          </div>
        </li>
      </ul>
      <ul class="other-group" v-else>
        <li v-for="(obj) in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.id)">
          <div class="rank-top">
            <img v-lazy="obj.rank.coverImgUrl">
            <p>{{obj.rank.updateFrequency}}</p>
          </div>
          <div class="rank-bottom">
            <p>{{obj.rank.name}}</p>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</ScrollView>
  <transition>
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import { getTopList } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Rank',
  data () {
    return {
      category: {}
    }
  },
  components: {
    ScrollView
  },
  methods: {
    selectedItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  },
  created () {
    getTopList()
      .then((data) => {
        this.category = data
        console.log(this.category)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
.rank{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color;
  overflow: hidden;
  .group{
    .group-title{
      @include font_size($font_large);
      font-weight: bold;
      padding: 5px 20px;
      @include font_color
    }
    .normal-group{
      li{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 30px;
        .rank-left{
          position: relative;
          img{
            height: 200px;
            width: 200px;
            border-radius: 30px;
          }
          p{
            position: absolute;
            bottom: 15px;
            right: 30px;
            @include font_size($font_samll);
            color: #fff;
          }
        }
        .rank-right{
          margin-left: 20px;
          p{
            padding: 10px 0;
            @include font_size($font_samll);
            @include clamp(1);
            @include font_color
          }
        }
      }
    }
    .other-group{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li{
        padding: 10px 0;
        .rank-top{
          position: relative;
          img{
            height: 200px;
            width: 200px;
            border-radius: 30px;
          }
          p{
            position: absolute;
            bottom: 15px;
            right: 30px;
            @include font_size($font_samll);
            color: #fff;
          }
        }
        .rank-bottom{
          width: 200px;
          p{
            padding: 5px 0;
            @include font_size($font_samll);
            @include clamp(1);
            @include font_color

          }
        }
      }
    }
  }
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
