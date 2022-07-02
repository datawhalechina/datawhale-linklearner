<template>
  <div class="competition">
    <div class="competition-tag">
      <div v-for="(item, index) of Object.keys(formattedTagList)" :key="`competition-tag-${index}`">
        <label style="margin-right: 16px; font-weight: bold">{{ item }}</label>
        <el-button
          v-for="(ele, index) of formattedTagList[item]"
          :key="`button-${index}`"
          :plain="true"
          class="competition-tag-item"
          :class="{ 'tag-focus': Object.values(selectedTags).includes(ele.id) }"
          @click="handleTagChange(ele)"
        >
          {{ ele.name }}
        </el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div
      class="competition-list"
      v-for="(item, index) in competition"
      :key="`competition-list-${index}`"
    >
      <competition-item
        :competition-item="item"
        :tag-list="tag"
        :key="`competition-list-item-${item.id}`"
      ></competition-item>
      <el-divider class="divider"></el-divider>
    </div>
    <el-pagination
      background
      v-model:current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      style="margin: 24px 0; text-align: center"
    ></el-pagination>
  </div>
  <app-footer></app-footer>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, watch, ref, computed } from 'vue';
import { http } from '../../service/http';
import { useRouter } from 'vue-router';
import competitionItem from '../../component/competitionItem.vue';
import appFooter from '../../component/appFooter.vue';

interface Tag {
  id: number;
  name: string;
  type: number;
  typeName: string;
}
interface Competition {
  bonus: string;
  categoryTag: number;
  createTime: string;
  description: string;
  difficultyTag: number;
  fieldTag: number;
  id: number;
  imageUrl: string;
  joinUrl: string;
  modifyTime: string;
  name: string;
  rank: number;
  rankingUrl: string | null;
  registrationEndTime: Date;
  resourceUrl: string | null;
  seriesTag: number;
}

interface CompetitionParams {
  seriesTag?: number; // 选填，系列标签
  categoryTag?: number; // 选填，类别标签
  fieldTag?: number; // 选填，领域标签
  difficultyTag?: number;
}

const fields = {
  0: 'seriesTag', // 系列标签
  1: 'categoryTag', // 类别标签
  2: 'fieldTag', // 领域标签
  3: 'difficultyTag' // 难度标签
};
export default {
  components: { competitionItem, appFooter },
  setup() {
    const data = reactive({
      competition: [] as Competition[],
      tag: [] as Tag[],
      total: 0
    });
    const currentPage = ref(1);
    const pageSize = ref(10);
    const selectedTags = ref<CompetitionParams>({});

    const handleTagChange = async (item: Tag) => {
      if (Object.values(selectedTags.value).includes(item.id)) {
        selectedTags.value[fields[item.type]] = undefined;
      } else {
        selectedTags.value[fields[item.type]] = item.id;
      }
      getCompetition(selectedTags.value);
    };

    const getCompetition = async (parameters: CompetitionParams) => {
      let params = {
        page: currentPage.value,
        pageSize: pageSize.value
      };
      if (parameters && Object.keys(parameters).length > 0) {
        params = Object.assign(params, parameters);
      }
      const result = await http.get('/api/competition', { params: params });
      if (!result) return;
      const response = result.data;
      data.competition = rankCompetition(response.data?.competitionList);
      data.total = response.data?.total;
      data.tag = response.data?.competitionTagList;
    };

    const rankCompetition = (list: Competition[]) => {
      return list.sort((a, b) => {
        return a.rank - b.rank;
      });
    };

    const formattedTagList = computed(() => {
      if (!data.tag || data.tag.length === 0) return {};
      let result = {};
      for (let item of data.tag) {
        if (result[item.typeName]?.length > 0) {
          result[item.typeName].push(item);
        } else {
          result[item.typeName] = [item];
        }
      }
      return result;
    });

    watch(currentPage, () => {
      getCompetition({});
    });

    onMounted(() => {
      getCompetition({});
    });

    return {
      ...toRefs(data),
      currentPage,
      pageSize,
      formattedTagList,
      selectedTags,
      handleTagChange
    };
  }
};
</script>

<style scoped>
.competition {
  padding: 30px 5vw 0 5vw;
  text-align: left;
}
.competition-tag {
  display: grid;
  grid-template-columns: repeat(2, 2fr);
}
.competition-tag-item {
  margin: 10px 12px;
  max-width: 112px;
  min-width: 112px;
  border: 1px solid #c2c2c2;
  text-align: center;
  color: #454545;
}
.competition-list:last-child .divider {
  border: none;
  margin: 24px 0 0;
}
.tag-focus {
  color: #409eff;
  border-color: rgb(64, 158, 255);
  background-color: rgb(255, 255, 255);
  outline: 0;
}
</style>
