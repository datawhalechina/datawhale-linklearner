import { CompetitionEntity } from '../entity/competition';
import { CompetitionTagEntity, COMPETITION_TAG_NAME } from '../entity/competitionTag';
import { getRepository } from 'typeorm';
import { clean } from '../util/clean';

export class CompetitionService {
  private competitionRepository = getRepository(CompetitionEntity);
  private competitionTagRepository = getRepository(CompetitionTagEntity);

  getAllCompetitionTag = async () => {
    const tagList = await this.competitionTagRepository.find();
    return tagList.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
        type: tag.type,
        typeName: COMPETITION_TAG_NAME[tag.type]
      };
    });
  };

  findCompetitionList = async (
    page: number,
    pageSize: number,
    tag: {
      seriesTag?: number;
      categoryTag?: number;
      fieldTag?: number;
      difficultyTag?: number;
    }
  ) => {
    return this.competitionRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: clean({
        ...tag
      }),
      order: {
        rank: 'DESC'
      }
    });
  };
}
