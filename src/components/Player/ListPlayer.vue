<template>
    <transition @enter="enter" @leave="leave">
      <div class="list-player" v-show="this.isShowListPlayer">
        <div class="player-wrapper">
          <div class="player-top">
            <div class="top-left">
              <div class="mode" @click="mode" ref="mode"></div>
              <p v-if="this.playMode === 0">顺序播放</p>
              <p v-else-if="this.playMode === 1">单曲循环</p>
              <p v-else>随机播放</p>
            </div>
            <div class="top-right">
              <div class="del" @click="del(-1)"></div>
            </div>
          </div>
          <div class="player-middle">
            <ScrollView ref="scrollView">
              <ul ref="play">
                <li class="item" v-for="(value,index) in songDetail" :key="value.id" @click="selectMusic(index)">
                  <div class="item-left">
                    <div class="item-play" @click.stop="playOrPause" v-show="currentIndex === index"></div>
                    <p>{{value.name}}</p>
                  </div>
                  <div class="item-right">
                    <div class="item-favorite" @click="favorite(value)" :class="{'active':isFavorite(value)}"></div>
                    <div class="item-del" @click.stop="del(index)"></div>
                  </div>
                </li>
              </ul>
            </ScrollView>
          </div>
          <div class="player-bottom">
            <p @click.stop="hidden">关闭</p>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  data: function () {
    return {
      isShow: false
    }
  },
  methods: {
    ...mapActions([
      'setPlayOrPause',
      'setPlayMode',
      'setDelSong',
      'setListPlayer',
      'setPlaySong',
      'setMask',
      'setFavoriteList'
    ]),
    show () {
      this.isShow = true
    },
    hidden () {
      this.setListPlayer(false)
      this.setMask(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.slideDownBigIn', { duration: 300 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownBigOut', { duration: 300 }, function () {
        done()
      })
    },
    playOrPause () {
      this.setPlayOrPause(!this.isPlayOrPause)
    },
    mode () {
      if (this.playMode === modeType.loop) {
        this.setPlayMode(modeType.one)
      } else if (this.playMode === modeType.one) {
        this.setPlayMode(modeType.random)
      } else {
        this.setPlayMode(modeType.loop)
      }
    },
    del (index) {
      this.setDelSong(index)
    },
    selectMusic (index) {
      this.setPlaySong(index)
    },
    favorite (value) {
      this.setFavoriteList(value)
      let index = this.favoriteList.indexOf(value)
      console.log(index)
      if (index > -1) {
        this.favoriteList.splice(index, 1)
      } else {
        this.setFavoriteList(value)
      }
    },
    isFavorite (value) {
      let result = this.favoriteList.find((v) => {
        return v.id === value.id
      })
      return result
    }
  },
  computed: {
    ...mapGetters(['isPlayOrPause', 'playMode', 'songDetail', 'isShowListPlayer', 'currentIndex', 'favoriteList'])
  },
  watch: {
    isPlayOrPause (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    playMode (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    isShowListPlayer (newValue, oldValue) {
      if (newValue) {
        console.log('haha')
        this.$refs.scrollView.refresh()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .list-player{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    @include bg_sub_color();
    .player-wrapper{
      .player-top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top-left{
          display: flex;
          align-items: center;
          padding-left: 20px;
          .mode{
            width: 56px;
            height: 56px;
            margin-right: 20px;

              @include bg_img('../../assets/images/small_loop');
            &.one{
              @include bg_img('../../assets/images/small_one');
            }
            &.random{
              @include bg_img('../../assets/images/small_shuffle');
            }

          }
          p{
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .top-right{
          .del{
            width: 84px;
            height: 84px;
            @include bg_img('../../assets/images/small_del');
          }
        }
      }
      .player-middle{
        height: 700px;
        overflow: hidden;
        ul{
          &.active{
            .item{
              .item-play{
                @include bg_img('../../assets/images/small_pause');
              }
            }
          }
        }
        .item{
          border-top: 1px solid #ddd;
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          .item-left{
            width: 70%;
            display: flex;
            align-items: center;
            .item-play{
              width: 56px;
              height: 56px;
              margin-right: 20px;
              @include bg_img('../../assets/images/small_play');
            }
            p{
              width: 80%;
              @include font_size($font_medium_s);
              @include font_color();
              @include no-wrap();
            }
          }
          .item-right{
            display: flex;
            align-items: center;
            .item-favorite{
              width: 56px;
              height: 56px;
              @include bg_img('../../assets/images/small_un_favorite');
              &.active{
                @include bg_img('../../assets/images/small_favorite');
              }
            }
            .item-del{
              width: 52px;
              height: 52px;
              margin-left: 20px;
              @include bg_img('../../assets/images/small_close')
            }
          }
        }
      }
      .player-bottom{

        width: 100%;
        height: 80px;
        line-height: 80px;
        @include bg_color();
        p{
          text-align: center;
          color: #fff;
          @include font_size($font_medium);
        }
      }
    }
  }

</style>
