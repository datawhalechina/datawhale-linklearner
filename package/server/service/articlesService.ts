import { ArticlesEntity } from '../entity/articlesEntity';
import { ArticleTagEntity } from '../entity/articleTagEntity';
import { getRepository, FindManyOptions } from 'typeorm';

export class ArticlesService {
  private articlesRepository = getRepository(ArticlesEntity);
  private articleTagRespository = getRepository(ArticleTagEntity);

  findArticles = async (query: FindManyOptions<ArticlesEntity>) => {
    return this.articlesRepository.find(query);
  };

  findTag = async (query: FindManyOptions<ArticleTagEntity>) => {
    return this.articleTagRespository.find(query);
  };

  findAvailableArticles = async () => {
    const availableArticles = await this.findArticles({
      take: 20,
      skip: 0
    });
    const output = availableArticles.map((item) => {
      return {
        title: item.title,
        summary: item.summary,
        author: item.author,
        tags: JSON.parse(item.tags),
        realm: item.realm,
        url: item.url,
        imgUrl: item.imgUrl
      };
    });
    return output;
  };

  findAvailableArticleTag = async () => {
    const availableArticleTag = await this.findTag({
      skip: 0
    });
    return availableArticleTag;
  };
}
