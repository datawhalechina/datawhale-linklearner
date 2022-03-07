<template>
  <div class="page">
    <div class="card-header flex-row-space-between">
      <div>基础知识</div>
      <!-- <el-button class="card-header-button" type="text">查看更多</el-button> -->
    </div>
    <div class="learn">
      <!-- <div class="learn-tag flex-row-left">
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
      </div> -->
      <el-divider></el-divider>
      <div class="learn-list">
        <div v-for="(item, index) in articles" :key="`learn-list-${index}`">
          <div class="article-item flex-row-left">
            <img class="article-image" :src="item.imgUrl" />
            <div class="article-detail">
              <a class="article-detail-name" :href="item.url">{{ item.title }}</a>
              <div class="article-detail-description">{{ item.summary }}</div>
              <div class="article-detail-tag-group flex-row-space-between">
                <div>
                  <el-tag
                    class="article-detail-tag"
                    v-for="(tag, index) in item.tags"
                    :key="`learn-tag-${index}`"
                    type="info"
                    >{{ tag }}</el-tag
                  >
                </div>
                <div>{{ item.author ? `作者：${item.author}` : '' }}</div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext, onMounted } from 'vue';
import { http } from '../../service/axios';
export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data = reactive({
      articles: [],
      tag: [],
      selectedTag: -1
    });

    onMounted(async () => {
      // const [articles, tag] = await Promise.all([http.get('/api/articles'), http.get('/api/articles/tag')]);
      // data.articles = articles.data.data;
      // data.tag = tag.data.data;

      const articles = await http.get('/api/articles');
      data.articles = articles.data.data;
      console.log(data.articles);
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>
<style scoped>
.page {
  padding: 30px 5vw;
  text-align: left;
}
.article-item {
  padding: 0 24px;
  height: 120px;
  cursor: pointer;
}

.article-tag {
  margin-bottom: 30px;
}
.article-tag-item {
  margin-right: 8px;
}
.article-image {
  width: 200px;
  height: 120px;
  object-fit: cover;
  margin-right: 30px;
  flex-shrink: 0;
}
.article-detail-name {
  font-size: 18px;
  height: 25px;
  line-height: 25px;
  color: black;
  text-decoration: none;
}
.article-detail-name:hover {
  font-size: 18px;
  height: 25px;
  line-height: 25px;
  color: #409eff;
  text-decoration: none;
}
.article-detail-description {
  margin-top: 10px;
  font-size: 14px;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
}
.article-detail {
  flex-grow: 1;
}
.article-detail-tag-group {
  width: 100%;
  margin-top: 13px;
  height: 32px;
}
.article-detail-tag {
  margin-right: 8px;
  font-size: 14px;
}
</style>