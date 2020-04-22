import network from './network'

export const getBanner = () => network.get('/banner?type=2')
export const getPersonalized = () => network.get('/personalized?limit=6')
export const getNewAlbum = () => network.get('/album/newest')
export const getNewSong = () => network.get('/personalized/newsong')
export const getPlayList = (data) => network.get('/playlist/detail', data)
export const getAlbum = (data) => network.get('/album', data)
export const getSongDetail = (data) => network.get('/song/detail', data)
export const getSongLyric = (data) => network.get('/lyric', data)
export const getSongUrl = (data) => network.get('/song/url', data)
export const getArtistsSong = (data) => network.get('/artists', data)
export const getHotArtists = () => {
  return new Promise((resolve, reject) => {
    network.get('/top/artists?offset=0&limit=10')
      .then((data) => {
        resolve(data.artists)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const getArtists = (letter) => {
  return new Promise((resolve, reject) => {
    let letterArtists = []
    network.all([
      network.get(`/artist/list?offset=0&limit=5&cat=1001&initial=${letter}`),
      network.get(`/artist/list?offset=0&limit=5&cat=1002&initial=${letter}`),
      network.get(`/artist/list?offset=0&limit=5&cat=1003&initial=${letter}`),
      network.get(`/artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
      network.get(`/artist/list?offset=0&limit=5&cat=2002&initial=${letter}`),
      network.get(`/artist/list?offset=0&limit=5&cat=2003&initial=${letter}`)
    ])
      .then((data) => {
        data.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        resolve(letterArtists)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const getAllArtists = () => {
  return new Promise((resolve, reject) => {
    let letters = ['热']
    let artistsList = [getHotArtists()]
    for (let key = 65; key < 91; key++) {
      let char = String.fromCharCode(key)
      letters.push(char)
      artistsList.push(getArtists(char))
    }
    network.all(artistsList)
      .then((result) => {
        let obj = {}
        obj.letters = letters
        obj.artistsList = result
        resolve(obj)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const getTopList = () => {
  return new Promise(function (resolve, reject) {
    let category = {
      officialList: [
        { name: '云音乐飙升榜', id: 3 },
        { name: '云音乐新歌榜', id: 0 },
        { name: '网易原创歌曲榜', id: 2 },
        { name: '云音乐热歌榜', id: 1 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '抖音排行榜', id: 26 },
        { name: '云音乐ACG音乐榜', id: 22 },
        { name: '云音乐古典音乐榜', id: 24 }
      ],
      globalList: [
        { name: '美国Billboard周榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon周榜', id: 10 },
        { name: 'iTunes榜', id: 8 },
        { name: '英国Q杂志中文版周榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '新声榜', id: 27 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '电竞音乐榜', id: 30 },
        { name: '云音乐欧美热歌榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    network.get('toplist/detail')
      .then(function (result) {
        result.list.forEach(function (item) {
          for (let key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (item.name === category[key][i].name) {
                category[key][i].rank = item
                break
              }
            }
          }
        })
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopListDetail = (data) => network.get('top/list', data)
