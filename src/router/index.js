import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import * as types from '../store/type'
import Home from '../components/home/index.vue'
import Article from '../components/article/index.vue'
import My from '../components/user/index.vue'
import Login from '../components/login/index.vue'
import NewTopic from '../components/newTopic/index.vue'
import TopicCollect from '../components/user/topic_collect/index.vue'
import Classify from '../components/classify/index.vue'

Vue.use(Router);

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/article',
      component: Article
    },
    {
      path: '/classify',
      component: Classify
    },
    {
      path: '/my',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: My
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/newTopic',
      meta: {
        requireAuth: true,
      },
      component: NewTopic
    },
    {
      path: '/topicCollect',
      meta: {
        requireAuth: true,
      },
      component: TopicCollect
    },
  ]
});

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

export default router;
