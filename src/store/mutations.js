export default {
  changeFullScreen (state, flag) {
    state.isFullScreen = flag
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  changeMiniPlayer (state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
  },
  changeListPlayer (state, flag) {
    state.isShowListPlayer = flag
  },
  changePlayOrPause (state, flag) {
    state.isPlayOrPause = flag
  },
  changePlayMode (state, flag) {
    state.modeType = flag
  },
  changeSongDetail (state, list) {
    state.songDetail = list
  },
  changeLyric (state, list) {
    state.lyric = list
  },
  delSong (state, index) {
    console.log(index)
    if (index !== -1) {
      state.songDetail.splice(index, 1)
    } else {
      state.songDetail = []
    }
    if (index < state.currentIndex && index !== -1) {
      state.currentIndex = state.currentIndex - 1
    }
    if (state.songDetail.length === 0) {
      state.isFullScreen = false
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  changePlaySong (state, index) {
    if (index < 0) {
      index = state.songDetail.length - 1
    } else if (index > state.songDetail.length - 1) {
      index = 0
    }
    state.currentIndex = index
  },
  changeMask (state, flag) {
    state.showMask = flag
  },
  changeCurTime (state, flag) {
    state.curTime = flag
  },
  setFavoriteList (state, song) {
    let result = state.favoriteList.find(function (value) {
      return value === song
    })
    if (result === undefined) {
      state.favoriteList.push(song)
    }
  },
  // 将喜欢歌曲列表保存在本地
  setLocalFavoriteList (state, list) {
    state.favoriteList = list
  },
  setHistoryList (state, song) {
    let result = state.historyList.find(function (value) {
      return value === song
    })
    if (result === undefined) {
      if (state.historyList.length > 20) {
        state.historyList.splice(0, 1)
      }
      state.historyList.push(song)
    }
  },
  // 将播放历史保存在本地
  setLocalHistoryList (state, list) {
    state.historyList = list
  }
}
