import { Request, Response } from 'express';
import { CompetitionService } from '../service/competitionService';
import { sendSuccessResponse, sendErrorResponse } from '../util/response';

export class CompetitionController {
  private competitionService = new CompetitionService();

  getCompetitonList = async (req: Request, res: Response) => {
    try {
      const {
        page = '1',
        pageSize = '10',
        seriesTag,
        categoryTag,
        fieldTag,
        difficultyTag
      } = req.query;

      const output = { competitionTagList: [], competitionList: [], total: 0, totalPages: 0 };

      // 获取competitionTagList
      const competitionTagList = await this.competitionService.getAllCompetitionTag();
      output.competitionTagList = competitionTagList;

      // 获取competitionList
      const [competitionList, total] = await this.competitionService.findCompetitionList(
        parseInt(`${page}`),
        parseInt(`${pageSize}`),
        {
          seriesTag: seriesTag ? parseInt(`${seriesTag}`) : undefined,
          categoryTag: categoryTag ? parseInt(`${categoryTag}`) : undefined,
          fieldTag: fieldTag ? parseInt(`${fieldTag}`) : undefined,
          difficultyTag: difficultyTag ? parseInt(`${difficultyTag}`) : undefined
        }
      );
      output.competitionList = competitionList;
      output.total = total;
      output.totalPages = Math.ceil(total / parseInt(`${pageSize}`));

      sendSuccessResponse(res, output);
    } catch (e) {
      sendErrorResponse(res, e.message);
    }
  };
}
