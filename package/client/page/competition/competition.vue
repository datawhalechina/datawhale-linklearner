<template>
  <div class="competition">
    <div class="learn-tag flex-row-left">
      <div v-for="(item, index) in tag" :key="`learn-tag-${index}`">
        <el-button
          :type="item.tagId === selectedTag ? primary : ''"
          :plain="true"
          class="learn-tag-item"
          @click="handleTagChange(item.tagId)"
        >
          {{ item.name }}
        </el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div
      class="competition-list"
      v-for="(item, index) in competition"
      :key="`competition-list-${index}`"
    >
      <competition-item :competition-item="item" :tag-list="tag"></competition-item>
      <el-divider class="divider"></el-divider>
    </div>
    <el-pagination
      background
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      layout="prev, pager, next"
      :total="total"
      style="margin: 24px 0; text-align: center"
    />
  </div>
  <app-footer></app-footer>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, watch } from 'vue';
import { http } from '../../service/http';
import competitionItem from '../../component/competitionItem.vue';
import { useRouter } from 'vue-router';
import appFooter from '../../component/appFooter.vue';

export default {
  components: { competitionItem, appFooter },
  setup() {
    const router = useRouter();
    const data = reactive({
      competition: [],
      tag: [],
      selectedTag: -1,
      currentPage: 1,
      pageSize: 10,
      total: 0
    });

    const handleTagChange = async (tagId: number) => {
      if (data.selectedTag === tagId) {
        data.selectedTag = -1;
        const competition = await http.get('/api/competition');
        data.competition = competition.data.data;
      } else {
        data.selectedTag = tagId;
        const competition = await http.get('/api/competition/getByTag', { params: { tagId } });
        data.competition = competition.data.data;
      }
    };

    const handleLearnItemClick = (learnId: number) => {
      router.push(`/competition/detail/${learnId}`);
    };

    const getCompetition = async () => {
      let params = {
        page: data.currentPage,
        pageSize: data.pageSize
      };
      const result = await http.get('/api/competition', { params: params });
      return result;
    };

		watch(){
			
		}

    onMounted(async () => {
      const result = await getCompetition();
      if (!result) return;
      const response = result.data;
      data.competition = response.data?.competitionList;
      data.total = response.data?.total;
      data.tag = response.data?.competitionTagList;
    });

    return {
      ...toRefs(data),
      handleTagChange,
      handleLearnItemClick
    };
  }
};
</script>

<style scoped>
.competition {
  padding: 30px 5vw 0 5vw;
  text-align: left;
}
.learn-tag {
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.learn-tag-item {
  margin: 4px;
}
.competition-list:last-child .divider {
  border: none;
  margin: 24px 0 0;
}
</style>
