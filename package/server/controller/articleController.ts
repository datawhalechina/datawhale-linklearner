import { Request, Response } from 'express';
import { ArticleService } from '../service/articleService';
import { sendSuccessResponse, sendErrorResponse } from '../util/response';

export class ArticleController {
  private articleService = new ArticleService();

  getAllTag = async (req: Request, res: Response) => {
    try {
      const tagList = await this.articleService.findTag({});
      const output = tagList.map((item) => {
        return {
          tagId: item.id,
          name: item.name
        };
      });
      sendSuccessResponse(res, output);
    } catch (e) {
      sendErrorResponse(res, e.message);
    }
  };

  getArticle = async (req: Request, res: Response) => {
    try {
      const { articleId, area } = req.query;
      let output: IArticleItem[];

      if (area === undefined) {
        output = [];
      } else if (articleId === undefined) {
        output = await this.articleService.findArticle({
          where: { area: parseInt(area as string) }
        });
      } else {
        output = await this.articleService.findArticle({
          where: {
            id: parseInt(articleId as string),
            area: parseInt(area as string)
          }
        });
      }

      sendSuccessResponse(res, output);
    } catch (e) {
      sendErrorResponse(res, e.message);
    }
  };

  getArticleByTag = async (req: Request, res: Response) => {
    try {
      const { tagId, area } = req.query;
      const tagIdNum = parseInt(tagId as string);
      const areaNum = parseInt(area as string);

      const output = await this.articleService.findArticleByTag(
        { where: { articleTagId: tagIdNum } },
        { area: areaNum }
      );

      sendSuccessResponse(res, output);
    } catch (e) {
      sendErrorResponse(res, e.message);
    }
  };
}

interface IArticleItem {
  id: number;
  area: number;
  name: string;
  author: string;
  imageUrl: string;
  url: string;
  releaseTime: Date;
  tagList: { tagId: number; tagName: string }[];
}
