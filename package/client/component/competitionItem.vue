<template>
  <div class="competition-item flex-row-left">
    <img class="competition-image" :src="item.imageUrl" />
    <div class="competition-detail">
      <div style="flex-grow: 1">
        <div class="competition-detail-name">{{ item.name }}</div>
        <div class="competition-detail-description" v-html="item.description"></div>
        <div class="competition-detail-tag-group flex-row-left" style="align-items: center">
          <el-tag class="competition-detail-tag" type="info">{{ seriesName }}</el-tag>
          <el-tag class="competition-detail-tag" type="info">{{ categoryName }}</el-tag>
          <el-tag class="competition-detail-tag" type="info">{{ fieldName }}</el-tag>
          <el-tag class="competition-detail-tag" type="info">{{ difficultyName }}</el-tag>
          <a href="" class="link">排行榜</a>
          <a href="" class="link">参赛开源资料</a>
        </div>
      </div>
      <div style="margin-left: 8rem; text-align: center; white-space: nowrap; color: #383838">
        <div>{{ item.bonus }}</div>
        <div style="margin-top: 10px">{{ endDate ? `结束${endDate}` : '' }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue';

interface CompetitionItem {
  name: string;
  description: string;
  imageUrl: string;
  joinUrl: string;
  rank: number;
  rankingUrl: string | null;
  resourceUrl: string | null;
  registrationEndTime: Date;
  bonus: string;
  seriesTag: number;
  categoryTag: number;
  fieldTag: number;
  difficultyTag: number;
}

interface tagList {
  id: number;
  name: string;
  type: number;
  tagName: string;
}

interface IcompetitionItemProps {
  competitionItem: CompetitionItem;
  tagList: tagList[];
}

export default {
  props: ['competitionItem', 'tagList'],
  setup(props: IcompetitionItemProps) {
    const data = reactive({
      item: props.competitionItem,
      tagList: props.tagList
    });

    const seriesName = computed(() => {
      return data.tagList.find((x) => x.id === data.item.seriesTag)?.name;
    });

    const categoryName = computed(() => {
      return data.tagList.find((x) => x.id === data.item.categoryTag)?.name;
    });

    const fieldName = computed(() => {
      return data.tagList.find((x) => x.id === data.item.fieldTag)?.name;
    });

    const difficultyName = computed(() => {
      return data.tagList.find((x) => x.id === data.item.difficultyTag)?.name;
    });

    const formatDate = function (date: Date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    };

    const endDate = formatDate(data.item.registrationEndTime);

    return {
      ...toRefs(data),
      seriesName,
      categoryName,
      fieldName,
      difficultyName,
      endDate
    };
  }
};
</script>

<style scoped>
.competition-item {
  padding: 0 24px;
  height: 120px;
  cursor: pointer;
}
.competition-image {
  width: 200px;
  height: 120px;
  object-fit: cover;
  margin-right: 30px;
  flex-shrink: 0;
}
.competition-detail {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.competition-detail-name {
  font-size: 18px;
  height: 25px;
  line-height: 25px;
}
.competition-detail-description {
  margin-top: 10px;
  font-size: 14px;
  min-height: 40px;
  line-height: 20px;
  overflow: hidden;
}
.competition-detail-tag-group {
  width: 100%;
  margin-top: 13px;
  height: 32px;
}
.competition-detail-tag {
  margin-right: 8px;
}

.link {
  margin: 8px;
  text-decoration: none;
  font-size: 14px;
}
</style>
