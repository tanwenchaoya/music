<template>
  <div class="singer">
    <ScrollView ref="ScrollView">
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value,index) in artistsList" :key="index" ref="group">
          <h3 class="group-title">{{letters[index]}}</h3>
          <ul>
            <li v-for="obj in value" :key="obj.id" class="singer-item" @click.stop="showSingerSongs(obj.id)">
              <img v-lazy="obj.picUrl">
              <p>{{obj.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="list-keys">
      <li v-for="(key,index) in letters" :key="key"
          :data-index="index"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          :class="{'activeKey':index===currentKey}">
        {{key}}
      </li>
    </ul>
    <div class="currentTopKey" v-show="fixTitle !== ''">{{fixTitle}}</div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  created () {
    getAllArtists()
      .then((result) => {
        this.letters = result.letters
        this.artistsList = result.artistsList
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    fixTitle () {
      if (this.scrollY > 0) {
        return ''
      } else {
        return this.letters[this.currentKey]
      }
    }
  },
  data () {
    return {
      letters: [],
      artistsList: [],
      groupTop: [],
      groupHeight: [],
      currentKey: 0,
      beginY: 0,
      moveY: 0,
      scrollY: 0
    }
  },
  components: {
    ScrollView
  },
  watch: {
    artistsList () {
      this.$nextTick(() => {
        this.$refs.group.forEach((value) => {
          this.groupTop.push(value.offsetTop)
          this.groupHeight.push(value.offsetHeight)
        })
      })
    }
  },
  methods: {
    _scrollSinger (index) {
      this.currentKey = index
      let offsetY = this.groupTop[index]
      this.$refs.ScrollView.scrollTo(0, -offsetY)
    },
    touchstart (e) {
      let index = parseInt(e.target.dataset.index)
      this._scrollSinger(index)
      this.startY = e.touches[0].pageY
    },
    touchmove (e) {
      this.moveY = e.touches[0].pageY
      let index = parseInt(e.target.dataset.index) + Math.floor((this.moveY - this.startY) / e.target.offsetHeight * 0.9)
      if (index < 0) {
        index = 0
      } else if (index > this.letters.length - 1) {
        index = this.letters.length - 1
      }
      this._scrollSinger(index)
    },
    showSingerSongs (id) {
      this.$router.push({
        path: `/singer/detail/${id}/singer`
      })
    }
  },
  mounted () {
    this.$refs.ScrollView.scrollIng((y) => {
      this.scrollY = y
      if (y > 0) {
        this.currentKey = 0
        return
      }
      for (let i = 1; i < this.groupTop.length; i++) {
        let preTop = this.groupTop[i - 1]
        let nextTop = this.groupTop[i]
        if (-y >= preTop && -y <= nextTop) {
          this.currentKey = i - 1
          return
        }
      }
      this.currentKey = this.groupTop.length - 1
    })
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/variable';
  @import '../assets/css/mixin';
.singer{
  position: fixed;
  top: 184px;
  bottom: 0px;
  left:0;
  right: 0;
  @include bg_sub_color();
  overflow: hidden;
  .list-wrapper{
    .list-group{
      .group-title{
        height: 40px;
        line-height: 40px;
        padding:0 20px;
        @include bg_color();
        @include font_size($font_medium);
        opacity: 0.6;
      }
    }
    ul{
      .singer-item{
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: 8px 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
        img{
          height: 80px;
          width: 84px;
          border-radius: 50%;
          margin-right: 40px;
        }
        p{
          height: 84px;
          line-height: 84px;
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
  }
  .list-keys{
    position: fixed;
    top: 55%;
    transform: translateY(-50%);
    right: 20px;
    li{
      padding: 3px 0;
     @include font_size($font_samll);
      &.activeKey{
        @include font_active_color;
        text-shadow:0 0 5px rgba(0,0,0,0.4);
      }
    }
  }
  .currentTopKey{
    position: fixed;
    top: 184px;
    height: 40px;
    width: 100%;
    line-height: 40px;
    padding:0 20px;
    @include bg_color();
    @include font_size($font_medium);
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
