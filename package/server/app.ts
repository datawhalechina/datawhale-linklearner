import 'reflect-metadata';
import express from 'express';
import { initDbConnection } from './db';
import { getRouter } from './router';
import { config } from './config';
import compression from 'compression';

const bodyParser = require('body-parser');

const main = async () => {
  await initDbConnection();

  const app = express();
  const port = 8081;

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /**
   * 解释一下背景，原来的前端页面挂在了 linklearner.com/datawhale-homepage 下，
   * 后来改成了 linklearner.com 下，所以这里放了两份静态资源。
   */
  app.use('/datawhale-homepage', express.static(config.staticFilePath));
  app.use('/', express.static(config.staticFilePath));

  // 使用getRouter是为了防止在建立dbconnection之前初始化entity
  app.use('/api', getRouter());
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
};

main();
