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
