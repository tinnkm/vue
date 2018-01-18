import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/Index'
import Detail from '@/pages/detail'
import forecast from '@/pages/detail/forecast'
import count from '@/pages/detail/count'
import analysis from '@/pages/detail/analysis'
import publish from '@/pages/detail/publish'
import orderList from '@/pages/orderList'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    redirect: '/detail/count',
    children: [
      {
        path: 'forecast',
        component: forecast
      },
      {
        path: 'count',
        component: count
      },
      {
        path: 'analysis',
        component: analysis
      },
      {
        path: 'publish',
        component: publish
      }
    ]
  },
  {
    path: '/orderList',
    component: orderList
  }
  ]
})
