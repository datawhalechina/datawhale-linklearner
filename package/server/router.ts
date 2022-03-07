import express from 'express';
import { ArticlesController } from './controller/articlesController';
import { HomepageController } from './controller/homepageController';
import { KnowledgeController } from './controller/knowledgeController';
import { LearnController } from './controller/learnController';
import { UserActionController } from './controller/userActionController';

export const getRouter = () => {
  const homepageController = new HomepageController();
  const learnController = new LearnController();
  const knowledgeController = new KnowledgeController();
  const userActionController = new UserActionController();
  const articlesController = new ArticlesController();

  const router = express.Router();

  router.get('/', homepageController.helloWorld);
  router.get('/homepage', homepageController.getHomepageData);
  router.get('/learn', learnController.getLearn);
  router.get('/learn/tag', learnController.getAllTag);
  router.get('/learn/getByTag', learnController.getLearnByTag);
  router.get('/learn/detail', learnController.getLearnDetail);
  router.get('/learn/video', learnController.getLearnVideo);
  router.get('/knowledge/list', knowledgeController.getKnowledge);
  router.get('/knowledge/mind', knowledgeController.getKnowledgeMind);
  router.post('/actions', userActionController.addUserAction);
  router.get('/actions/export', userActionController.exportUserAction);
  router.get('/actions/analyze', userActionController.analyzeUserAction);
  router.get('/articles', articlesController.getArticles);
  router.get('/articles/tag', articlesController.getTag);
  return router;
};
