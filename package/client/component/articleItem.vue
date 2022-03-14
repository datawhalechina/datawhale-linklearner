<template>
  <div class="article-item flex-row-left">
    <img class="article-image" :src="imageUrl" />
    <div class="article-detail">
      <div class="article-detail-name">{{ name }}</div>
      <div class="article-detail-description">作者：{{ author }}</div>
      <div class="article-detail-tag-group flex-row-left">
        <el-tag
          class="article-detail-tag"
          v-for="(tag, index) in tagList"
          :key="`article-tag-${index}`"
          type="info"
          >{{ tag.tagName }}</el-tag
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

interface IArticleItemProps {
  imageUrl: string;
  name: string;
  author: string;
  tagList: { tagName: string }[];
}

export default {
  props: ['imageUrl', 'name', 'author', 'tagList'],
  setup(props: IArticleItemProps) {
    const data = reactive({
      imageUrl: props.imageUrl,
      name: props.name,
      author: props.author,
      tagList: props.tagList
    });

    return {
      ...toRefs(data)
    };
  }
};
</script>

<style scoped>
.article-item {
  padding: 0 24px;
  height: 120px;
  cursor: pointer;
}
.article-image {
  width: 200px;
  height: 120px;
  object-fit: cover;
  margin-right: 30px;
  flex-shrink: 0;
}
.article-detail {
  width: 100%;
  height: 120px;
}
.article-detail-name {
  font-size: 18px;
  height: 25px;
  line-height: 25px;
}
.article-detail-description {
  margin-top: 10px;
  font-size: 14px;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
}
.article-detail-tag-group {
  width: 100%;
  margin-top: 13px;
  height: 32px;
}
.article-detail-tag {
  margin-right: 8px;
}
</style>
