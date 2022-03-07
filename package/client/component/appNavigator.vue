<template>
  <div class="navigator">
    <div class="navigator-left">Datawhale</div>
    <el-menu
      :default-active="convertRouterIndexToMenuIndex($store.state.routerIndex)"
      class="navigator-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item class="navigator-menu-item" index="homepage"> 主页 </el-menu-item>
      <el-menu-item class="navigator-menu-item" index="learn"> 学习项目 </el-menu-item>
      <el-menu-item class="navigator-menu-item" index="knowledge"> 培养方案 </el-menu-item>
			 <el-menu-item class="navigator-menu-item" index="articles"> 干货文章 </el-menu-item>
    </el-menu>
    <div class="navigator-right">
      <el-popover placement="bottom" :width="200" trigger="hover">
        <template #reference>
          <wechat-logo class="navigator-logo"></wechat-logo>
        </template>
        <div class="navigator-qrcode-popover">
          <div class="navigator-qrcode-popover-title">扫码关注公众号</div>
          <img class="navigator-qrcode-popover-image" src="../asset/qrcode.jpg" />
        </div>
      </el-popover>
      <github-logo class="navigator-logo" @click="goGithub"></github-logo>
    </div>
  </div>
</template>

<script lang="ts">
import { ROUTER_MAP } from '../router/constant';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import githubLogo from '../asset/github.svg';
import wechatLogo from '../asset/wechat.svg';

// routerIndex与menuIndex的映射关系
const ROUTER_MENU_RELATION = [
  { routerIndex: '0', menuIndex: 'homepage' },
  { routerIndex: '1', menuIndex: 'learn' },
  { routerIndex: '2', menuIndex: 'knowledge' },
  { routerIndex: '3', menuIndex: 'learn' },
	{ routerIndex: '5', menuIndex: 'articles' },
  { routerIndex: '4', menuIndex: '' }
];

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const convertRouterIndexToMenuIndex = (routerIndex: string) => {
      const relation = ROUTER_MENU_RELATION.filter((item) => item.routerIndex === routerIndex);
      const menuIndex = relation[0].menuIndex;
      return menuIndex;
    };

    const handleSelect = (key: string) => {
      const relation = ROUTER_MENU_RELATION.filter((item) => item.menuIndex === key);
      const routerIndex = relation[0].routerIndex;
      store.commit('setRouterIndex', routerIndex);
      router.push(ROUTER_MAP[routerIndex]);
    };

    const goGithub = () => {
      window.open('https://github.com/datawhalechina');
    };
    return { convertRouterIndexToMenuIndex, handleSelect, goGithub };
  },
  components: { githubLogo, wechatLogo }
};
</script>

<style scoped>
.navigator {
  display: flex;
  flex-direction: row;
}
.navigator-left {
  width: 265px;
  height: 60px;
  border-bottom: solid 1px var(--el-border-color-light);
  text-align: center;
  font-size: 24px;
  line-height: 60px;
  height: 60px;
  color: var(--el-color-primary);
}
.navigator-menu {
  width: 100%;
  font-weight: 500;
  --el-menu-bg-color: var(--el-color-white);
  --el-menu-hover-bg-color: var(--el-color-white);
}
.navigator-menu-item {
  width: 120px;
}
.navigator-right {
  width: 300px;
  height: 60px;
  border-bottom: solid 1px var(--el-border-color-light);
  text-align: center;
  font-size: 22px;
  line-height: 60px;
  height: 60px;
}
.navigator-logo {
  margin: 18px 24px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: var(--el-menu-text-color);
}
.navigator-qrcode-popover {
  width: 200px;
  height: 225px;
  padding: 0;
}
.navigator-qrcode-popover-title {
  width: 200px;
  height: 20px;
  line-height: 20px;
  margin-bottom: 5px;
  text-align: center;
  color: var(--el-color-black);
}
.navigator-qrcode-popover-image {
  width: 200px;
  height: 200px;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: var(--el-menu-active-color);
}
</style>
