import { getSongDetail, getSongLyric, getSongUrl } from '../api/index'

export default {
  setFullScreen ({ commit }, flag) {
    commit('changeFullScreen', flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit('changeMiniPlayer', flag)
  },
  setListPlayer ({ commit }, flag) {
    commit('changeListPlayer', flag)
  },
  setPlayOrPause ({ commit }, flag) {
    commit('changePlayOrPause', flag)
  },
  setPlayMode ({ commit }, flag) {
    commit('changePlayMode', flag)
  },
  async setSongDetail ({ commit }, ids) {
    let result = await getSongDetail({ ids: ids.join(',') })
    let urls = await getSongUrl({ id: ids.join(',') })
    console.log(urls)
    let list = []
    result.songs.forEach(function (value, i) {
      let obj = {}
      for (let j = 0; j < urls.data.length; j++) {
        let item = urls.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.id = value.id
      obj.name = value.name
      let singer = ''
      value['ar'].forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value['al'].picUrl
      list.push(obj)
    })
    commit('changeSongDetail', list)
  },
  async setLyric ({ commit }, id) {
    let result = await getSongLyric({ id: id })
    let obj = parseLyric(result.lrc.lyric)
    commit('changeLyric', obj)
  },
  setDelSong ({ commit }, index) {
    commit('delSong', index)
  },
  setPlaySong ({ commit }, index) {
    commit('changePlaySong', index)
  },
  setMask ({ commit }, flag) {
    commit('changeMask', flag)
  },
  setCurTime ({ commit }, time) {
    commit('changeCurTime', time)
  },
  setFavoriteList ({ commit }, song) {
    commit('setFavoriteList', song)
  },
  setLocalFavoriteList ({ commit }, song) {
    commit('setLocalFavoriteList', song)
  },
  setHistoryList ({ commit }, song) {
    commit('setHistoryList', song)
  },
  setLocalHistoryList ({ commit }, song) {
    commit('setLocalHistoryList', song)
  }
}
// 格式化歌词方法
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
