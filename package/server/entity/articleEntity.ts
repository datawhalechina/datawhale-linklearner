import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("article", { schema: "datawhale_homepage" })
export class ArticleEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "文章id",
    unsigned: true,
  })
  id: number;

  @Column("tinyint", {
    name: "area",
    nullable: true,
    comment: "文章领域",
  })
  area: number | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "文章名称",
    length: 512,
  })
  name: string | null;

  @Column("varchar", {
    name: "author",
    nullable: true,
    comment: "文章作者",
    length: 512,
  })
  author: string | null;

  @Column("varchar", {
    name: "image_url",
    nullable: true,
    comment: "封面图",
    length: 512,
  })
  imageUrl: string | null;

  @Column("varchar", {
    name: "url",
    nullable: true,
    comment: "文章链接",
    length: 512,
  })
  url: string | null;

  @Column("timestamp", {
    name: "release_time",
    nullable: true,
    comment: "文章发布时间",
  })
  releaseTime: Date | null;

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
