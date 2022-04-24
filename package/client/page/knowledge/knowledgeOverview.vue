<template>
  <div class="knowledge-overview">
    <el-alert title="为什么会有AI培养方案" type="info" show-icon :closable="false">
      <slot>
        给初涉AI的你，提供一份切实可行的学习路线；诚挚欢迎任何有意向为本培养方案贡献课程的同学加入，具体请联系
        <a target="_blank" href="https://github.com/datawhalechina/DOPMC">
          Datawhale开源项目管理委员会
        </a>
        。本培养方案在持续修订更新中，获取最新版请关注微信公众号：Datawhale，回复“培养方案”。
      </slot>
    </el-alert>
    <div class="knowledge-overview-chart" ref="chartElement"></div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { http } from '../../service/http';

export default {
  name: 'knowledge-overview',
  setup() {
    const chartElement = ref<HTMLElement | null>(null);

    onMounted(async () => {
      const myChart = echarts.init(chartElement.value);
      myChart.showLoading();
      const knowledgeOverviewRes = await http.get('/api/knowledge/mind');
      const overviewData = JSON.parse(knowledgeOverviewRes.data.data.content);
      myChart.hideLoading();

      const option = {
        title: {
          text: 'AI培养方案图',
          subtext: '培养方案可以拖动/缩放/展开或收起节点进行查看'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: (params) => {
            const name = params.treeAncestors.map((item) => item.name).join(' -> ');
            if (params.value) {
              return name + '<br/> 查看地址：' + params.value;
            }
            return name;
          }
        },
        series: [
          {
            type: 'tree',
            id: 0,
            data: [overviewData],
            name: 'AI知识体系图',
            symbolSize: 12,
            left: '8%',
            right: '20%',
            initialTreeDepth: 1,
            lineStyle: {
              width: 2
            },
            label: {
              backgroundColor: '#fff',
              position: 'left',
              verticalAlign: 'middle',
              align: 'right'
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            expandAndCollapse: true,
            roam: true
          }
        ]
      };

      myChart.setOption(option);
      myChart.on('click', (param) => {
        if (param.value) {
          window.open(`${param.value}`);
        }
      });
    });

    return {
      chartElement
    };
  }
};
</script>

<style scoped>
.knowledge-overview {
  padding: 30px;
}
.knowledge-overview-introduction {
  background-color: #f4f4f4;
  border: 1px solid #b3b3b3;
  padding: 0.5rem;
}
.knowledge-overview-chart {
  margin-top: 30px;
  width: 100%;
  height: calc(100vh - 211px);
}
</style>
