<template>
<div class="search">
  <div class="search-box">
    <img class="search-icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="/>
    <input type="text" placeholder="搜索歌手、歌曲" v-model="keywords" v-throttle="search">
  </div>
  <div v-show="keywords !== ''" class="search-suggest">
    <ScrollView>
      <ul>
        <li v-for="song in searchList" :key="song.id" @click.stop="selectMusic(song.id)">
          <img class="search-icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="/>
          <p>{{song.name}} - {{song.artists[0].name}}</p>
        </li>
      </ul>
    </ScrollView>
  </div>
  <div class="search-history" v-show="keywords === ''">
    <div class="history-top">
      <h3>历史记录</h3>
      <img src="../assets/images/delete.png" @click.stop="deleteList">
    </div>
    <div class="history-bottom">
      <span v-for="value in searchHistoryList" :key="value" @click.stop="selectHot(value)">{{value}}</span>
    </div>
  </div>
  <div class="search-hot" v-show="keywords === ''">
    <ScrollView>
      <ul>
        <h3>热搜榜</h3>
        <li class="hot-item" v-for="(hotSong,index) in hotList" :key="index" @click.stop="selectHot(hotSong.searchWord)">
          <p class="hot-left" :class="{'active':index<3}">{{index+1}}</p>
          <div class="hot-right">
            <p>{{hotSong.searchWord}}<img v-if="hotSong.iconUrl !== null" :src="hotSong.iconUrl"></p>
            <p>{{hotSong.content}}</p>
          </div>
        </li>
      </ul>
    </ScrollView>
  </div>
</div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchSuggest, getHotListDetail } from '../api/index'
import { mapActions } from 'vuex'
export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data () {
    return {
      keywords: '',
      searchList: [],
      hotList: [],
      searchHistoryList: []
    }
  },
  directives: {
    throttle: {
      inserted: function (el, obj) {
        let timed = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timed && clearTimeout(timed)
          timed = setTimeout(function () {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail',
      'setPlayOrPause'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
      this.setPlayOrPause(false)
      if (!this.searchHistoryList.includes(this.keywords)) {
        this.searchHistoryList.push(this.keywords)
        window.localStorage.setItem('searchHistoryList', JSON.stringify(this.searchHistoryList))
      }
    },
    search () {
      getSearchSuggest({ 'keywords': this.keywords })
        .then((result) => {
          console.log(result)
          this.searchList = result.result.songs
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    selectHot (name) {
      this.keywords = name
      this.search()
    },
    deleteList () {
      window.localStorage.removeItem('searchHistoryList')
      this.searchHistoryList = []
    }
  },
  created () {
    getHotListDetail()
      .then((result) => {
        this.hotList = result.data
        console.log(this.hotList)
      })
    let searchHistoryList = JSON.parse(window.localStorage.getItem('searchHistoryList'))
    if (searchHistoryList !== null) {
      this.searchHistoryList = searchHistoryList
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
.search{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color;
  overflow: hidden;
  .search-box{
    margin: 30px 20px;
    align-items: center;
    background: #ebecec;
    border-radius: 30px;
    overflow: hidden;
    display: flex;
    padding: 10px 20px;
    img{
      height: 40px;
      width: 40px;
    }
    input{
      height: 60px;
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      color: #000;
      padding-left: 30px;
      cursor: pointer;
    }
  }
  .search-suggest{
    position: fixed;
    top: 320px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    li{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 10px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
      img{
        height: 40px;
        width: 40px;
      }
      p{
        line-height: 60px;
        height: 60px;
        @include font_size($font_medium_s);
        @include font_color;
        color: #000;
        margin-left: 20px;
      }
    }
  }
  .search-hot{
    position: fixed;
    top: 450px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    h3{
      padding: 0 20px;
      box-sizing: border-box;
      @include font_size($font_medium_s);
      font-weight: bold;
    }
    .hot-item{
      display: flex;
      align-items: center;
      margin: 25px 0;
      .hot-left{
        margin-left: 30px;
        height: 70px;
        width: 70px;
        line-height: 70px;
        &.active{
          color: #f40;
        }
      }
      .hot-right{
        height: 70px;
        padding: 10px 0;
        box-sizing: border-box;
        img{
          height: 33px;
          width: 30px;
          margin-left: 10px;
        }
        p{
          &:nth-of-type(1){
            @include font_size($font_medium);
            margin-bottom: 5px;
          }
          &:nth-of-type(2){
            @include font_size($font_samll);
            @include font_color;
          }
        }
      }
    }
  }
  .search-history{
    padding: 0 20px;
    box-sizing: border-box;
    .history-top{
      display: flex;
      justify-content: space-between;
      h3{
        @include font_size($font_medium_s);
        font-weight: bold;
        margin-bottom: 10px;
      }
      img{
        height: 30px;
        width:30px;
      }
    }

    .history-bottom{
      white-space: nowrap;
      overflow-x: scroll;
      &::-webkit-scrollbar{
        display: none;
      }
      span{
        display: inline-block;
        padding: 14px 30px;
        margin-right: 15px;
        border-radius: 30px;
        @include font_size($font_samll);
        background: #ccc;
      }
    }
  }
}
</style>
