<template>
  <div class="navigator">
    <div class="navigator-left">Datawhale</div>
    <el-menu
      :default-active="getDefaultActiveMenu($store.state.routerIndex)"
      class="navigator-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item class="navigator-menu-item" index="homepage"> 主页 </el-menu-item>
      <el-menu-item class="navigator-menu-item" index="learn"> 学习项目 </el-menu-item>
      <el-menu-item class="navigator-menu-item" index="knowledge"> 培养方案 </el-menu-item>
      <el-menu-item class="navigator-menu-item" index="competition"> 竞赛实践 </el-menu-item>
      <el-sub-menu index="article">
        <template #title>干货文章</template>
        <el-menu-item index="article1">科研求职</el-menu-item>
        <el-menu-item index="article2">项目实战</el-menu-item>
        <el-menu-item index="article3">学习经验</el-menu-item>
        <el-menu-item index="article4">基础知识</el-menu-item>
        <el-menu-item index="article5">实践排坑</el-menu-item>
      </el-sub-menu>
      <el-menu-item class="navigator-menu-item" index="about"> 关于我们 </el-menu-item>
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
import { useRouter } from 'vue-router';
import githubLogo from '../asset/github.svg';
import wechatLogo from '../asset/wechat.svg';

export default {
  setup() {
    const router = useRouter();

    const getDefaultActiveMenu = (routerIndex: string) => {
      // routerIndex与menuIndex的映射关系
      const ROUTER_MENU_RELATION = {
        '/': () => {
          return 'homepage';
        },
        '/learn': () => {
          return 'learn';
        },
        '/knowledge': () => {
          return 'knowledge';
        },
        '/competition': () => {
          return 'competition';
        },
        '/learn/detail/:learnId': () => {
          return 'learn';
        },
        '/article/:articleId': () => {
          const articleId = router.currentRoute.value.params.articleId;
          return `article${articleId}`;
        },
        '/about': () => {
          return 'about';
        },
        '/analyzer': () => {
          return '';
        }
      };

      const getMenuIndexFunction = ROUTER_MENU_RELATION[routerIndex];
      return getMenuIndexFunction ? getMenuIndexFunction() : 'homepage';
    };

    const handleSelect = (key: string) => {
      // menuIndex与routerIndex的映射关系
      const MENU_ROUTER_RELATION = {
        homepage: '/',
        learn: '/learn',
        knowledge: '/knowledge',
        competition: '/competition',
        article1: '/article/1',
        article2: '/article/2',
        article3: '/article/3',
        article4: '/article/4',
        article5: '/article/5',
        about: '/about'
      };

      const routerIndex = MENU_ROUTER_RELATION[key] || '/';
      router.push(routerIndex);
    };

    const goGithub = () => {
      window.open('https://github.com/datawhalechina');
    };
    return { getDefaultActiveMenu, handleSelect, goGithub };
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
