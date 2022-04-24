<template>
  <div class="knowledge flex-row-left">
    <div class="knowledge-side-menu">
      <div
        @click="selectMenu('0')"
        class="side-menu"
        :class="[selectedId === '0' ? 'selected-item' : 'side-menu-title']"
      >
        关于AI培养方案
      </div>
      <div
        @click="selectMenu(item.id)"
        v-for="item of knowledge"
        :key="item.id"
        :index="item.id"
        class="side-menu"
        :class="[selectedId === item.id ? 'selected-item' : 'side-sub-menu']"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="knowledge-content">
      <knowledge-overview v-if="selectedId === '0'"></knowledge-overview>
      <knowledge-detail v-if="selectedId !== '0'" :content="content"></knowledge-detail>
    </div>
  </div>
  <app-footer></app-footer>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { http } from '../../service/http';
import knowledgeDetail from './knowledgeDetail.vue';
import knowledgeOverview from './knowledgeOverview.vue';
import appFooter from '../../component/appFooter.vue';

export default {
  components: {
    knowledgeDetail,
    knowledgeOverview,
    appFooter
  },
  setup() {
    const data = reactive({
      selectedId: '0',
      knowledge: [],
      content: []
    });

    const selectMenu = (index: string) => {
      const ele = data.knowledge.find((item) => item.id === index);
      data.content = ele ? ele.content : [];
      data.selectedId = index;
    };

    onMounted(async () => {
      const knowledgeRes = await http.get('/api/knowledge/list');
      data.knowledge = knowledgeRes.data.data.map((item) => {
        return {
          id: item.id.toString(),
          name: item.name,
          content: JSON.parse(item.content)
        };
      });
      selectMenu('0');
    });

    return {
      ...toRefs(data),
      selectMenu
    };
  }
};
</script>

<style scoped>
.knowledge {
  height: calc(100vh - 61px - 54px);
}
.knowledge-side-menu {
  height: calc(100vh - 61px - 54px);
  overflow: auto;
  width: 200px;
  font-size: 14px;
  border-right: solid 1px #e6e6e6;
  cursor: pointer;
  flex-shrink: 0;
}
.side-menu {
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  color: var(--el-text-color-primary);
}
.selected-item {
  color: var(--el-color-primary);
}
.knowledge-content {
  width: 100%;
  height: calc(100vh - 61px - 54px);
  overflow: auto;
}
</style>
