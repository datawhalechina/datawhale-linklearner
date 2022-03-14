import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article_tag', { schema: 'datawhale_homepage' })
export class ArticleTagEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '文章标签id',
    unsigned: true
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: '文章标签名称',
    length: 512
  })
  name: string | null;

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
