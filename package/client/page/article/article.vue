<template>
  <div class="article">
    <div class="article-tag flex-row-left">
      <div v-for="(item, index) in tag" :key="`article-tag-${index}`">
        <el-button
          v-if="item.tagId === selectedTag"
          type="primary"
          :plain="true"
          class="article-tag-item"
          @click="handleTagChange(item.tagId)"
        >
          {{ item.name }}
        </el-button>
        <el-button
          v-if="item.tagId !== selectedTag"
          class="article-tag-item"
          :plain="true"
          @click="handleTagChange(item.tagId)"
        >
          {{ item.name }}
        </el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="article-list">
      <div v-for="(item, index) in article" :key="`article-list-${index}`">
        <article-item
          :name="item.name"
          :imageUrl="item.imageUrl"
          :tagList="item.tagList"
          :author="item.author"
          @click="handleArticleItemClick(item.url)"
        ></article-item>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { http } from '../../service/axios';
import articleItem from '../../component/articleItem.vue';
import { useRouter } from 'vue-router';

export default {
  components: { articleItem },
  setup() {
    const router = useRouter();

    const data = reactive({
      article: [],
      tag: [],
      currentArea: 1,
      selectedTag: -1
    });

    const handleTagChange = async (tagId: number) => {
      if (data.selectedTag === tagId) {
        data.selectedTag = -1;
        const article = await http.get('/api/article', {
          params: { tagId, area: data.currentArea }
        });
        data.article = article.data.data;
      } else {
        data.selectedTag = tagId;
        const article = await http.get('/api/article/getByTag', {
          params: { tagId, area: data.currentArea }
        });
        data.article = article.data.data;
      }
    };

    const handleArticleItemClick = (url: string) => {
      window.open(url);
    };

    onMounted(async () => {
      data.currentArea = parseInt(router.currentRoute.value.params.articleId as string);
      const [article, tag] = await Promise.all([
        http.get('/api/article', { params: { area: data.currentArea } }),
        http.get('/api/article/tag')
      ]);
      data.article = article.data.data;
      data.tag = tag.data.data;
    });

    return {
      ...toRefs(data),
      handleTagChange,
      handleArticleItemClick
    };
  }
};
</script>

<style scoped>
.article {
  padding: 30px 5vw 0 5vw;
  text-align: left;
}
.article-tag {
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.article-tag-item {
  margin: 4px;
}
</style>
