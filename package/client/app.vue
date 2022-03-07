<template>
  <div v-if="viewValid">
    <app-navigator></app-navigator>
    <div class="router-view">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
  <div v-else class="invalid-view">
    请在宽度大于{{ minWidth }}px的浏览器下浏览该网页，以取得最佳展示效果。
  </div>
</template>

<script lang="ts">
import appNavigator from './component/appNavigator.vue';
import { onMounted, reactive, toRefs } from 'vue';

import { MIN_DISPLAY_WIDTH } from './constant';

export default {
  components: { appNavigator },
  setup() {
    const data = reactive({
      viewValid: true,
      minWidth: MIN_DISPLAY_WIDTH
    });

    onMounted(() => {
      window.addEventListener('resize', () => {
        if (document.body.clientWidth < MIN_DISPLAY_WIDTH && data.viewValid) {
          data.viewValid = false;
        } else if (document.body.clientWidth >= MIN_DISPLAY_WIDTH && !data.viewValid) {
          data.viewValid = true;
        }
      });
    });

    return {
      ...toRefs(data)
    };
  }
};
</script>

<style scoped>
.router-view {
  width: 100%;
  height: calc(100vh - 61px);
  overflow: auto;
}
.invalid-view {
  font-size: 3vw;
  font-weight: bold;
  line-height: 100vh;
  text-align: center;
  word-break: break-all;
}
</style>
