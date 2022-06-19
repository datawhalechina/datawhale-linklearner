import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("competition", { schema: "datawhale_homepage" })
export class CompetitionEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "竞赛id",
    unsigned: true,
  })
  id: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "竞赛名称",
    length: 512,
  })
  name: string | null;

  @Column("varchar", {
    name: "description",
    nullable: true,
    comment: "竞赛描述",
    length: 512,
  })
  description: string | null;

  @Column("varchar", {
    name: "image_url",
    nullable: true,
    comment: "竞赛封面图",
    length: 512,
  })
  imageUrl: string | null;

  @Column("varchar", {
    name: "join_url",
    nullable: true,
    comment: "竞赛报名链接",
    length: 512,
  })
  joinUrl: string | null;

  @Column("int", {
    name: "rank",
    nullable: true,
    comment: "竞赛排序，从小到大",
  })
  rank: number | null;

  @Column("varchar", {
    name: "ranking_url",
    nullable: true,
    comment: "竞赛排行榜链接",
    length: 512,
  })
  rankingUrl: string | null;

  @Column("varchar", {
    name: "resource_url",
    nullable: true,
    comment: "竞赛相关资源链接",
    length: 512,
  })
  resourceUrl: string | null;

  @Column("timestamp", {
    name: "registration_end_time",
    nullable: true,
    comment: "竞赛截止时间",
  })
  registrationEndTime: Date | null;

  @Column("varchar", {
    name: "bonus",
    nullable: true,
    comment: "竞赛奖金",
    length: 512,
  })
  bonus: string | null;

  @Column("int", { name: "series_tag", nullable: true, comment: "系列标签" })
  seriesTag: number | null;

  @Column("int", { name: "category_tag", nullable: true, comment: "类别标签" })
  categoryTag: number | null;

  @Column("int", { name: "field_tag", nullable: true, comment: "领域标签" })
  fieldTag: number | null;

  @Column("int", {
    name: "difficulty_tag",
    nullable: true,
    comment: "难度标签",
  })
  difficultyTag: number | null;

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
