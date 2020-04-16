<template>
  <swiper :options="swiperOption" class="banner">
    <!-- slides -->
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="wrapper">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="ScrollView">
        <ul>
          <li v-for="(value,index) in currentLyric" :key="index" :class="{'active' : currentLineNum === index}">{{value}}</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0'
    }
  },
  computed: {
    ...mapGetters(['isPlayOrPause', 'currentSong', 'currentLyric'])
  },
  watch: {
    isPlayOrPause (newValue, oldValue) {
      if (newValue) {
        this.$refs.wrapper.classList.add('active')
      } else {
        this.$refs.wrapper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      let lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      let currLyricTop = document.querySelector('li.active').offsetTop
      let lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currLyricTop > lyricHeight / 2) {
        this.$refs.ScrollView.scrollTo(0, lyricHeight / 2 - currLyricTop, 20)
      }
    },
    currentLyric (newValue, oldValue) {
      for (let key in newValue) {
        this.currentLineNum = key
        return
      }
    }
  },
  methods: {
    getFirstLyric () {
      return this.currentLyric[this.currentLineNum]
    },
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      let result = this.currentLyric[lineNum + '']
      if (result !== undefined && result !== '') {
        return lineNum + ''
      } else {
        lineNum--
        return this.getActiveLineNum(lineNum)
      }
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";

  .banner {
    position: fixed;
    top: 100px;
    left: 0px;
    right: 0px;
    bottom: 250px;
    overflow: hidden;
    //background: #0c5460;
    .cd {
      .cd-wrapper {
        width: 500px;
        height: 500px;
        margin: 100px auto;
        overflow: hidden;
        border: 20px solid #dddddd;
        border-radius: 50%;
        animation: sport 20s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
        img {
          height: 100%;
          width: 100%;
        }
      }

      p {
        text-align: center;
        @include font_size($font_large);
        color: #393939;
      }
    }

    .lyric {
      li {
        text-align: center;
        margin: 10px 0;
        @include font_size($font_samll);
        color: #393939;
        &:last-of-type {
          padding-bottom: 80%;
        }
        &.active{
          color: #f40;
        }
      }
    }
  }
  @keyframes sport {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>
<style lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";

  .my-bullet {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #fff;
    margin-right: 20px;
    border-radius: 50%;

  }

  .my-bullet-active {
    width: 50px;
    border-radius: 20px;
    @include bg_color();
  }
</style>
