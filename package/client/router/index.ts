import { createRouter, createWebHashHistory } from 'vue-router';
import { ROUTER_MAP } from './constant';
import store from '../store';

const homepage = () => import(/* webpackChunkName: 'homepage' */ '../page/homepage/homepage.vue');
const learn = () => import(/* webpackChunkName: 'learn' */ '../page/learn/learn.vue');
const knowledge = () =>
  import(/* webpackChunkName: 'knowledge' */ '../page/knowledge/knowledge.vue');
const learnDetail = () =>
  import(/* webpackChunkName: 'learnDetail' */ '../page/learnDetail/learnDetail.vue');
const analyzer = () => import(/* webpackChunkName: 'analyzer' */ '../page/analyzer/analyzer.vue');
const articles = () => import(/* webpackChunkName: 'articles' */ '../page/articles/articles.vue');

const routerHashHistory = createWebHashHistory();

const router = createRouter({
  history: routerHashHistory,
  routes: [
    {
      path: ROUTER_MAP[0],
      component: homepage
    },
    {
      path: ROUTER_MAP[1],
      component: learn
    },
    {
      path: ROUTER_MAP[2],
      component: knowledge
    },
    {
      path: ROUTER_MAP[3],
      component: learnDetail
    },
    {
      path: ROUTER_MAP[4],
      component: analyzer
    },
    {
      path: ROUTER_MAP[5],
      component: articles
    }
  ]
});

router.beforeEach((to, from, next) => {
  for (const key in ROUTER_MAP) {
    if (to.matched && to.matched.length > 0 && ROUTER_MAP[key] === to.matched[0].path) {
      store.commit('setRouterIndex', key);
      break;
    }
  }
  next();
});

export default router;
