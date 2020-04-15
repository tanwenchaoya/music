import Vue from 'vue'
import VueRouter from 'vue-router'
// 下面的加载方法会将所有的组件都加载进来,不能实现按需加载,想实现按需加载得采用下面的
/*
import Recommend from '../views/Recommend'
import Singer from '../views/Singer'
import Rank from '../views/Rank'
import Search from '../views/Search'
*/
// 按需加载
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}
const Account = (resolve) => {
  import('../views/Account').then((module) => {
    resolve(module)
  })
}
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  { path: '/recommend',
    component: Recommend,
    children: [
      { path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search },
  { path: '/account', component: Account }

]

const router = new VueRouter({
  routes
})

export default router
