<template>
  <div class="learn">
    <div class="learn-tag flex-row-left">
      <div v-for="(item, index) in tag" :key="`learn-tag-${index}`">
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
    <div class="learn-list">
      <div v-for="(item, index) in learn" :key="`learn-list-${index}`">
        <learn-item
          :name="item.name"
          :imageUrl="item.imageUrl"
          :tagList="item.tagList"
          :description="item.description"
          @click="handleLearnItemClick(item.id)"
        ></learn-item>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { http } from '../../service/http';
import learnItem from '../../component/learnItem.vue';
import { useRouter } from 'vue-router';

export default {
  components: { learnItem },
  setup() {
    const router = useRouter();
    const data = reactive({
      learn: [],
      tag: [],
      selectedTag: -1
    });

    const handleTagChange = async (tagId: number) => {
      if (data.selectedTag === tagId) {
        data.selectedTag = -1;
        const learn = await http.get('/api/learn');
        data.learn = learn.data.data;
      } else {
        data.selectedTag = tagId;
        const learn = await http.get('/api/learn/getByTag', { params: { tagId } });
        data.learn = learn.data.data;
      }
    };

    const handleLearnItemClick = (learnId: number) => {
      router.push(`/learn/detail/${learnId}`);
    };

    onMounted(async () => {
      const [learn, tag] = await Promise.all([http.get('/api/learn'), http.get('/api/learn/tag')]);
      data.learn = learn.data.data;
      data.tag = tag.data.data;
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
.learn {
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
</style>
