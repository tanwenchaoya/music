export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  isPlayOrPause (state) {
    return state.isPlayOrPause
  },
  playMode (state) {
    return state.modeType
  },
  songDetail (state) {
    return state.songDetail
  },
  currentSong (state) {
    let obj = {
      name: '',
      singer: '',
      picUrl: null,
      url: null
    }
    if (state.songDetail.length !== 0) {
      obj = state.songDetail[state.currentIndex]
    }
    console.log(obj)
    return obj
  },
  currentLyric (state) {
    return state.lyric
  },
  currentIndex (state) {
    return state.currentIndex
  },
  isShowMask (state) {
    return state.showMask
  },
  curTime (state) {
    return state.curTime
  },
  favoriteList (state) {
    return state.favoriteList
  },
  historyList (state) {
    return state.historyList
  }
}
