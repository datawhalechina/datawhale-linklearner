<template>
  <div class="competition">
    <div class="learn-tag flex-row-left">
      <div v-for="(item, index) in competition?.competitionTagList" :key="`learn-tag-${index}`">
        <el-button
          v-if="item.tagId === selectedTag"
          type="primary"
          :plain="true"
          class="learn-tag-item"
          @click="handleTagChange(item.tagId)"
        >
          {{ item.name }}
        </el-button>
        <el-button
          v-if="item.tagId !== selectedTag"
          class="learn-tag-item"
          :plain="true"
          @click="handleTagChange(item.tagId)"
        >
          {{ item.name }}
        </el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div
      class="competition-list"
      v-for="(item, index) in competition?.competitionList"
      :key="`competition-list-${index}`"
    >
      <competition-item
        :competition-item="item"
        :tag-list="competition?.competitionTagList"
      ></competition-item>
      <el-divider class="divider"></el-divider>
    </div>
  </div>
  <app-footer></app-footer>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
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
      selectedTag: -1
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

    onMounted(async () => {
      const competition = await http.get('/api/competition');
      data.competition = competition.data.data;
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
