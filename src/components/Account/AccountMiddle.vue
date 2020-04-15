<template>
<div class="accountMiddle">
  <ScrollView>
    <ul class="songList">
      <li class="item" v-for="value in list" :key="value.id" @click="playMusic(value.id)">
        <img :src="value.picUrl" class="listLeft">
        <div class="listRight">
          <p>{{value.singer}}</p>
          <p>{{value.name}}</p>
        </div>
      </li>
    </ul>
  </ScrollView>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ScrollView from '../ScrollView'
export default {
  name: 'AccountMiddle',
  data: function () {
    return {
      list: []
    }
  },
  components: {
    ScrollView
  },
  methods: {
    ...mapActions([
      'setSwitchNum',
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail',
      'setPlayOrPause'
    ]),
    playMusic (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
      this.setPlayOrPause(false)
    }
  },
  computed: {
    ...mapGetters(['switchNum'])
  },
  created () {
    if (this.switchNum === 0) {
      this.list = JSON.parse(window.localStorage.getItem('favoriteList'))
    } else {
      this.list = JSON.parse(window.localStorage.getItem('historyList'))
    }
  },
  watch: {
    switchNum (newValue, oldValue) {
      if (newValue === 0) {
        this.list = JSON.parse(window.localStorage.getItem('favoriteList'))
      } else {
        this.list = JSON.parse(window.localStorage.getItem('historyList'))
      }
      console.log(this.list)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.accountMiddle{
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  .songList{
    .item{
      height: 150px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #ddd;
      @include bg_sub_color;
      .listLeft{
        height: 100px;
        width: 100px;
        border-radius: 20px;
        margin-right: 30px;
      }
      .listRight{
        height: 100px;
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
}
</style>
