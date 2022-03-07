import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("article_tag_relation", { schema: "datawhale_homepage" })
export class ArticleTagRelationEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "关系id",
    unsigned: true,
  })
  id: number;

  @Column("int", { name: "article_id", nullable: true, comment: "文章id" })
  articleId: number | null;

  @Column("int", { name: "article_tag_id", nullable: true, comment: "标签id" })
  articleTagId: number | null;

  @Column("timestamp", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
  })
  createTime: Date | null;

  @Column("timestamp", {
    name: "modify_time",
    nullable: true,
    comment: "修改时间",
  })
  modifyTime: Date | null;
}
