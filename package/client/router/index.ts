import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store';

const homepage = () => import(/* webpackChunkName: 'homepage' */ '../page/homepage/homepage.vue');
const learn = () => import(/* webpackChunkName: 'learn' */ '../page/learn/learn.vue');
const knowledge = () =>
  import(/* webpackChunkName: 'knowledge' */ '../page/knowledge/knowledge.vue');
const learnDetail = () =>
  import(/* webpackChunkName: 'learnDetail' */ '../page/learnDetail/learnDetail.vue');
const article = () => import(/* webpackChunkName: 'article' */ '../page/article/article.vue');
const analyzer = () => import(/* webpackChunkName: 'analyzer' */ '../page/analyzer/analyzer.vue');

const routerHashHistory = createWebHashHistory();

const ROUTES = [
  {
    path: '/',
    component: homepage
  },
  {
    path: '/learn',
    component: learn
  },
  {
    path: '/knowledge',
    component: knowledge
  },
  {
    path: '/learn/detail/:learnId',
    component: learnDetail
  },
  {
    path: '/article/:articleId',
    component: article
  },
  {
    path: '/analyzer',
    component: analyzer
  }
];

const router = createRouter({
  history: routerHashHistory,
  routes: ROUTES
});

router.beforeEach((to, from, next) => {
  const routePathList = ROUTES.map((item) => item.path);
  if (to.matched && to.matched.length > 0 && routePathList.includes(to.matched[0].path)) {
    store.commit('setRouterIndex', to.matched[0].path);
  }
  next();
});

export default router;
