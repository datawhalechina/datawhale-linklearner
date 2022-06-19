import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("competition_tag", { schema: "datawhale_homepage" })
export class CompetitionTagEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "标签id",
    unsigned: true,
  })
  id: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "标签名称",
    length: 512,
  })
  name: string | null;

  @Column("int", {
    name: "type",
    nullable: true,
    comment: "竞赛标签种类，0：系列，1：类别，2：领域，3：难度",
  })
  type: number | null;

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

export enum COMPETITION_TAG_TYPE {
  SERIES = 0,
  CATEGORY = 1,
  FIELD = 2,
  DIFFICULTY = 3,
}

export const COMPETITION_TAG_NAME = {
  [COMPETITION_TAG_TYPE.SERIES]: "系列",
  [COMPETITION_TAG_TYPE.CATEGORY]: "类别",
  [COMPETITION_TAG_TYPE.FIELD]: "领域",
  [COMPETITION_TAG_TYPE.DIFFICULTY]: "难度",
}