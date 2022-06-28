<template>
  <div class="homepage">
    <div class="homepage-banner">
      <el-carousel trigger="click" height="400px" arrow="never">
        <el-carousel-item v-for="(item, index) in banner" :key="`carousel-item-${index}`">
          <div
            class="homepage-banner-item"
            :style="`background-image: url('${item.url}')`"
            @click="jumpToUrl(item.linkUrl)"
          >
            <div class="homepage-banner-text">{{ item.description }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="homepage-content flex-row-space-between">
      <el-card class="learn-card">
        <template #header>
          <div class="card-header flex-row-space-between">
            <div>热门学习</div>
            <el-button @click="toLearn" class="card-header-button" type="text">查看更多</el-button>
          </div>
        </template>
        <div v-for="(item, index) in learn" :key="`learn-${index}`">
          <learn-item
            :name="item.name"
            :imageUrl="item.imageUrl"
            :tagList="item.tagList"
            :description="item.description"
            @click="handleLearnItemClick(item.id)"
          ></learn-item>
          <el-divider></el-divider>
        </div>
      </el-card>
      <el-card class="activity-card">
        <template #header>
          <div class="card-header">参加活动</div>
        </template>
        <div v-if="activity.length > 0">
          <div v-for="(item, index) in activity" :key="`activity-${index}`">
            <div class="activity-item">
              <el-button type="text" @click="jumpToUrl(item.link)">{{ item.name }}</el-button>
              <div class="activity-end-time">{{ item.endTime }} 截止</div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
        <div v-else>
          <div class="empty-activity">暂无活动</div>
        </div>
      </el-card>
    </div>
  </div>
  <app-footer></app-footer>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { http } from '../../service/http';
import learnItem from '../../component/learnItem.vue';
import { useRouter } from 'vue-router';
import appFooter from '../../component/appFooter.vue';

export default {
  components: { learnItem, appFooter },
  setup() {
    const router = useRouter();

    const data = reactive({
      activity: [],
      banner: [
        {
          url: '',
          description: ''
        }
      ],
      learn: []
    });

    const handleLearnItemClick = (learnId: number) => {
      router.push(`/learn/detail/${learnId}`);
    };

    const jumpToUrl = (url: string) => {
      window.open(url);
    };

    const toLearn = () => {
      router.push('/learn');
    };

    onMounted(async () => {
      const res = await http.get('/api/homepage');
      const { activity, banner, learn } = res.data.data;
      data.activity = activity;
      data.banner = banner;
      data.learn = learn;
    });

    return {
      ...toRefs(data),
      jumpToUrl,
      handleLearnItemClick,
      toLearn
    };
  }
};
</script>

<style scoped>
.homepage {
  padding: 30px 5vw;
  text-align: left;
}
.homepage-banner {
  width: 100%;
  height: 400px;
}
.homepage-banner-item {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.homepage-banner-text {
  font-size: 40px;
  padding: 300px 70px 0 70px;
  color: var(--el-color-white);
}
.homepage-content {
  margin-top: 30px;
}
.card-header {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
}
.learn-card {
  width: 100%;
  height: 100%;
  margin-right: 30px;
}
.activity-card {
  width: 400px;
  height: 100%;
}
.activity-item {
  padding: 0 24px;
  height: 60px;
}
.activity-end-time {
  font-size: 12px;
  color: var(--el-color-info);
}
.empty-activity {
  width: 100%;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 14px;
  color: var(--el-color-info);
}
</style>
