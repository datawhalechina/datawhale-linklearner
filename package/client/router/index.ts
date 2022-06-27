import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store';

const homepage = () => import(/* webpackChunkName: 'homepage' */ '../page/homepage/homepage.vue');
const learn = () => import(/* webpackChunkName: 'learn' */ '../page/learn/learn.vue');
const knowledge = () =>
  import(/* webpackChunkName: 'knowledge' */ '../page/knowledge/knowledge.vue');
const learnDetail = () =>
  import(/* webpackChunkName: 'learnDetail' */ '../page/learnDetail/learnDetail.vue');
const article = () => import(/* webpackChunkName: 'article' */ '../page/article/article.vue');
const about = () => import(/* webpackChunkName: 'about' */ '../page/about/about.vue');
const analyzer = () => import(/* webpackChunkName: 'analyzer' */ '../page/analyzer/analyzer.vue');
const competition = () =>
  import(/* webpackChunkName: 'knowledge' */ '../page/competition/competition.vue');

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
    path: '/competition',
    component: competition
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
    path: '/about',
    component: about
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
