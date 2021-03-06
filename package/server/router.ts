import express from 'express';
import { ArticleController } from './controller/articleController';
import { HomepageController } from './controller/homepageController';
import { KnowledgeController } from './controller/knowledgeController';
import { LearnController } from './controller/learnController';
import { UserActionController } from './controller/userActionController';
import { CompetitionController } from './controller/competitionController';

export const getRouter = () => {
  const homepageController = new HomepageController();
  const learnController = new LearnController();
  const knowledgeController = new KnowledgeController();
  const userActionController = new UserActionController();
  const articleController = new ArticleController();
  const competitionController = new CompetitionController();

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
  router.get('/article', articleController.getArticle);
  router.get('/article/tag', articleController.getAllTag);
  router.get('/article/getByTag', articleController.getArticleByTag);
  router.post('/article', articleController.addArticle);
  router.get('/competition', competitionController.getCompetitonList);

  return router;
};
