<template>
  <div
    class="competition-item flex-row-left"
    @click="jumpToUrl(item.joinUrl, 'click-join-competition')"
  >
    <img class="competition-image" :src="item.imageUrl" />
    <div class="competition-detail-wrapper">
      <div class="competition-detail">
        <div class="competition-detail-name">{{ item.name }}</div>
        <div class="competition-detail-description" v-html="item.description"></div>
        <div class="competition-detail-tag-group flex-row-left">
          <el-tag class="competition-detail-tag" type="info">{{ seriesName }}</el-tag>
          <el-tag class="competition-detail-tag" type="info">{{ categoryName }}</el-tag>
          <el-tag class="competition-detail-tag" type="info">{{ fieldName }}</el-tag>
          <el-tag class="competition-detail-tag" type="info">{{ difficultyName }}</el-tag>
          <div
            @click.stop="jumpToUrl(item.rankingUrl, 'click-competition-rank')"
            :class="['default', { static: !item?.rankingUrl }]"
            target="_blank"
          >
            排行榜
          </div>
          <div
            @click.stop="jumpToUrl(item.resourceUrl, 'click-competition-resource')"
            :class="['default', { static: !item?.resourceUrl }]"
            target="_blank"
          >
            参赛开源资料
          </div>
        </div>
      </div>
      <div class="competition-bonus">
        <div>{{ item.bonus }}</div>
        <div class="competition-bonus-status">{{ endDate ? `结束${endDate}` : '' }}</div>
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

    const jumpToUrl = (url: string, key: string) => {
      window.tracker.addCustomLog(key, { type: 'click' });
      if (!url) return;
      window.open(url);
    };

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
      endDate,
      jumpToUrl
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
.competition-detail-wrapper {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.competition-detail {
  flex-grow: 1;
}
.competition-detail-name {
  font-size: 18px;
  height: 25px;
  line-height: 25px;
  text-decoration: none;
  color: black;
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
  align-items: center;
}
.competition-detail-tag {
  margin-right: 8px;
}

.competition-bonus {
  margin-left: 64px;
  text-align: right;
  white-space: nowrap;
  color: #383838;
}
.competition-bonus-status {
  margin-top: 10px;
}

.default {
  color: black;
  margin: 8px;
  text-decoration: none;
  font-size: 14px;
}

.default:hover,
:focus {
  color: #709eff;
  margin: 8px;
  text-decoration: none;
  font-size: 14px;
}

.static {
  color: #909399;
  cursor: not-allowed;
}
.static:hover,
:focus {
  color: #909399;
}
</style>
