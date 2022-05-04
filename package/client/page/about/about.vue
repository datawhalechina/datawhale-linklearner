<template>
  <div class="about">
    <iframe class="about-iframe" :src="aboutUrl"></iframe>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { DATAWHALE_HOMEPAGE_URL } from '../../service/http';

export default {
  setup() {
    const data = reactive({
      aboutUrl: DATAWHALE_HOMEPAGE_URL
    });

    return {
      ...toRefs(data)
    };
  }
};
</script>

<style scoped>
.about {
  width: 100%;
  height: calc(100vh - 61px);
  padding: 0px;
}

.about-iframe {
  width: 100%;
  height: calc(100vh - 61px);
  border: 0px;
}
</style>
