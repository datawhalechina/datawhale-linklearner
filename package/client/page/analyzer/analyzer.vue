<template>
  <div class="analyzer">
    <div class="flex-row-left">
      <div class="analyzer-time-picker-header">设置时间：</div>
      <el-date-picker
        class="analyzer-time-picker"
        v-model="dateRange"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>

    <el-divider></el-divider>

    <el-card class="analyzer-card">
      <template #header>
        <div class="analyzer-card-header">数据概览</div>
      </template>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="PV">{{ userActionData.overview.pv }}</el-descriptions-item>
        <el-descriptions-item label="UV">{{ userActionData.overview.uv }}</el-descriptions-item>
        <el-descriptions-item label="跳出率">
          {{ getPercentage(userActionData.overview.jumpOutRate) }}
        </el-descriptions-item>
        <el-descriptions-item label="平均访问时长">
          {{ getAverageVisitTime(userActionData.overview.averageVisitTime) }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-divider></el-divider>

    <el-card class="analyzer-card">
      <template #header>
        <div class="analyzer-card-header">用户访问路径信息</div>
      </template>
      <el-table :data="userActionData.urlStatistic">
        <el-table-column prop="url" label="访问路径" />
        <el-table-column prop="visitNumber" label="访问次数" />
      </el-table>
    </el-card>

    <el-divider></el-divider>

    <div class="flex-row-space-between">
      <el-card class="analyzer-half-card">
        <template #header>
          <div class="analyzer-card-header">用户设备分辨率信息</div>
        </template>
        <el-table :data="userActionData.device.clientInfo">
          <el-table-column prop="info" label="设备分辨率" />
          <el-table-column prop="number" label="数量" />
        </el-table>
      </el-card>

      <el-card class="analyzer-half-card">
        <template #header>
          <div class="analyzer-card-header">用户浏览器信息</div>
        </template>
        <el-table :data="userActionData.device.browserInfo">
          <el-table-column prop="info" label="浏览器型号" />
          <el-table-column prop="number" label="数量" />
        </el-table>
      </el-card>
    </div>

    <el-divider></el-divider>

    <el-card class="analyzer-card">
      <template #header>
        <div class="analyzer-card-header">性能信息</div>
      </template>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="DNS 缓存时间">
          {{ userActionData.performance.cacheTime }}
        </el-descriptions-item>
        <el-descriptions-item label="TCP 建立连接完成握手的时间">
          {{ userActionData.performance.connectTime }}
        </el-descriptions-item>
        <el-descriptions-item label="解析 DOM 树结构的时间">
          {{ userActionData.performance.domReadyTime }}
        </el-descriptions-item>
        <el-descriptions-item label="DNS 查询时间">
          {{ userActionData.performance.domainLookupTime }}
        </el-descriptions-item>
        <el-descriptions-item label="执行 onload 回调函数的时间">
          {{ userActionData.performance.loadEventTime }}
        </el-descriptions-item>
        <el-descriptions-item label="页面加载完成的时间">
          {{ userActionData.performance.loadPageTime }}
        </el-descriptions-item>
        <el-descriptions-item label="重定向的时间">
          {{ userActionData.performance.redirectTime }}
        </el-descriptions-item>
        <el-descriptions-item label="内容加载完成的时间">
          {{ userActionData.performance.requestTime }}
        </el-descriptions-item>
        <el-descriptions-item label="读取页面第一个字节的时间">
          {{ userActionData.performance.timeToFirstByte }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, watch } from 'vue';
import { http } from '../../service/http';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const data = reactive({
      dateRange: [new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()],
      userActionData: {
        overview: {
          pv: 0,
          uv: 0,
          jumpOutRate: 0,
          averageVisitTime: 0
        },
        urlStatistic: [],
        device: {
          screenInfo: [],
          clientInfo: [],
          browserInfo: []
        },
        performance: {
          cacheTime: 0,
          connectTime: 0,
          domReadyTime: 0,
          domainLookupTime: 0,
          loadEventTime: 0,
          loadPageTime: 0,
          redirectTime: 0,
          requestTime: 0,
          timeToFirstByte: 0,
          unloadTime: 0
        }
      }
    });

    const getPercentage = (num: number) => {
      const percentage = num * 100;
      if (percentage < 1) {
        return `< 1%`;
      }

      return `${Math.floor(percentage)}%`;
    };

    const getAverageVisitTime = (visitTime: number) => {
      const time = visitTime / 1000;
      const hour = `${Math.floor(time / 60 / 60)}`.padStart(2, '0');
      const minute = `${Math.floor(time / 60) % 60}`.padStart(2, '0');
      const second = `${Math.floor(time) % 60}`.padStart(2, '0');

      return `${hour}小时${minute}分钟${second}秒`;
    };

    const getTime = (date: Date) => {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const onTimePickerChange = async () => {
      try {
        const res = await http.get('/api/actions/analyze', {
          params: {
            startTime: getTime(data.dateRange[0]),
            endTime: getTime(data.dateRange[1])
          }
        });

        data.userActionData = res.data.data;
      } catch (e) {
        ElMessage.error('日志太多，分析不过来了QAQ');
      }
    };

    onMounted(async () => {
      await onTimePickerChange();
    });

    watch(
      () => data.dateRange,
      async () => {
        await onTimePickerChange();
      }
    );

    return {
      ...toRefs(data),
      getPercentage,
      getAverageVisitTime,
      onTimePickerChange
    };
  }
};
</script>

<style scoped>
.analyzer {
  padding: 30px 5vw;
  text-align: left;
}
.analyzer-time-picker {
  margin: 10px 0;
}
.analyzer-card {
  width: 100%;
}
.analyzer-half-card {
  width: 48%;
}
.analyzer-card-header {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
}
.analyzer-time-picker-header {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  margin-right: 8px;
}
</style>
