import { createApp } from 'vue';
import App from './app.vue';
import store from './store';
import router from './router';
import elementPlus from 'element-plus';
import './style/common.css';
import './style/markdown.css';
import 'element-plus/dist/index.css';
import 'markdown-it-highlight/dist/index.css';
import { initTracker, setLogReportTimer } from './util/tracker';

const main = async () => {
  const app = createApp(App);
  app.use(store);
  app.use(router);
  app.use(elementPlus);
  app.mount('#root');

  await initTracker();
  setLogReportTimer();

  console.log(
    '%c 感谢 ZY、文昕、小丽同学对 DATAWHALE 官网的辛苦付出',
    'color:#409EFF;font-size:20px;text-shadow: 2px 2px 2px #b3d8ff;'
  );
};

main();
