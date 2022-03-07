import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles', { schema: 'datawhale' })
export class ArticlesEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'id',
    unsigned: true
  })
  id: number;

  @Column('char', {
    name: 'title',
    nullable: true,
    comment: '文章标题',
    length: 255
  })
  title: string | null;

  @Column('varchar', {
    name: 'summary',
    nullable: true,
    comment: '文章作者',
    length: 512
  })
  summary: string | null;

  @Column('char', {
    name: 'author',
    nullable: true,
    comment: '文章作者',
    length: 255
  })
  author: string | null;

  @Column('varchar', {
    name: 'tags',
    nullable: true,
    comment: '文章标签',
    length: 255
  })
  tags: string | null;

  @Column('text', {
    name: 'realm',
    nullable: true,
    comment: '文章所属领域'
  })
  realm: string | null;

  @Column('varchar', {
    name: 'url',
    nullable: true,
    comment: '文章链接',
    length: 512
  })
  url: string | null;

  @Column('varchar', {
    name: 'img_url',
    nullable: true,
    comment: '文章封面图',
    length: 512
  })
  imgUrl: string | null;

  @Column('timestamp', {
    name: 'release_time',
    nullable: true,
    comment: '发布时间'
  })
  releaseTime: Date | null;

  @Column('timestamp', {
    name: 'create_time',
    nullable: true,
    comment: '创建时间'
  })
  createTime: Date | null;

  @Column('timestamp', {
    name: 'modify_time',
    nullable: true,
    comment: '修改时间'
  })
  modifyTime: Date | null;
}
