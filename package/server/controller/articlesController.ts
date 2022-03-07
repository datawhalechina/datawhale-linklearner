import { Request, Response } from 'express';
import { ArticlesService } from '../service/articlesService';
import { sendSuccessResponse, sendErrorResponse } from '../util/response';

export class ArticlesController {
  private articlesService = new ArticlesService();

  getArticles = async (req: Request, res: Response) => {
    try {
      const articleList = await this.articlesService.findAvailableArticles();
      sendSuccessResponse(res, articleList);
    } catch (e) {
      sendErrorResponse(res, e.message);
    }
  };

  getTag = async (req: Request, res: Response) => {
    try {
      const tag = await this.articlesService.findAvailableArticleTag();
      sendSuccessResponse(res, tag);
    } catch (e) {
      sendErrorResponse(res, e.message);
    }
  };
}
