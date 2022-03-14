import { getRepository, FindManyOptions, In, FindConditions } from 'typeorm';
import { ArticleEntity } from '../entity/articleEntity';
import { ArticleTagEntity } from '../entity/articleTagEntity';
import { ArticleTagRelationEntity } from '../entity/articleTagRelationEntity';
import { removeDuplicateItem } from '../util/removeDuplicate';

export class ArticleService {
  private articleRepository = getRepository(ArticleEntity);
  private articleTagRepository = getRepository(ArticleTagEntity);
  private articleTagRelationRepository = getRepository(ArticleTagRelationEntity);

  find = async (query: FindManyOptions<ArticleEntity>) => {
    return this.articleRepository.find(query);
  };

  findTag = async (query: FindManyOptions<ArticleTagEntity>) => {
    return this.articleTagRepository.find(query);
  };

  findTagRelation = async (query: FindManyOptions<ArticleTagRelationEntity>) => {
    return this.articleTagRelationRepository.find(query);
  };

  findArticle = async (query: FindManyOptions<ArticleEntity>) => {
    const articleList = await this.find(query);
    const articleTagRelationList = await this.findTagRelation({
      where: {
        articleId: In(articleList.map((item) => item.id))
      }
    });
    const articleTagList = await this.findTag({
      where: {
        id: In(articleTagRelationList.map((item) => item.articleTagId))
      }
    });

    // 组合article、tag
    const output = articleList.map((item) => {
      const tagList = articleTagRelationList
        .filter((relation) => relation.articleId === item.id)
        .map((relation) => {
          const tagInfoList = articleTagList.filter((tag) => tag.id === relation.articleTagId);
          if (tagInfoList.length === 0) {
            return {
              tagId: relation.articleTagId,
              tagName: ''
            };
          }

          return {
            tagId: relation.articleTagId,
            tagName: tagInfoList[0].name
          };
        });

      return {
        id: item.id,
        area: item.area,
        name: item.name,
        author: item.author,
        imageUrl: item.imageUrl,
        url: item.url,
        releaseTime: item.releaseTime,
        tagList
      };
    });

    return output;
  };

  findArticleByTag = async (
    articleTagQuery: FindManyOptions<ArticleTagRelationEntity>,
    articleQuery: FindConditions<Omit<ArticleEntity, 'id'>>
  ) => {
    const targetArticleTagRelationList = await this.findTagRelation(articleTagQuery);
    const targetArticleIdList = removeDuplicateItem(
      targetArticleTagRelationList.map((item) => item.articleId)
    );

    return this.findArticle({
      where: {
        id: In(targetArticleIdList),
        ...articleQuery
      }
    });
  };

  addArticle = async (article: Partial<ArticleEntity>) => {
    return this.articleRepository.save(article);
  };

  // 新增文章标签，若已有相同标签，则不处理
  addArticleTag = async (articleTag: string) => {
    const existArticleTag = await this.articleTagRepository.findOne({
      where: {
        name: articleTag
      }
    });

    if (existArticleTag) {
      return existArticleTag;
    }

    return this.articleTagRepository.save({
      name: articleTag,
      createTime: new Date(),
      modifyTime: new Date()
    });
  };

  addArticleWithTag = async (
    article: Partial<ArticleEntity>,
    tagList: Partial<ArticleTagEntity>[]
  ) => {
    const { id: articleId } = await this.addArticle({
      ...article,
      createTime: new Date(),
      modifyTime: new Date()
    });

    const articleTagRelationList = tagList.map((item) => {
      return {
        articleId,
        articleTagId: item.id,
        createTime: new Date(),
        modifyTime: new Date()
      };
    });

    await this.articleTagRelationRepository.save(articleTagRelationList);
    return articleId;
  };
}
