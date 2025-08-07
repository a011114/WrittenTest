<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useUsernameStore } from '@/stores/counter.js'
import * as echarts from 'echarts';

const usernameStore = useUsernameStore()
const isShown = computed(() => usernameStore.username === 'admin')
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Project Name', dataIndex: 'project', key: 'project' },
  { title: 'Overtime', dataIndex: 'overtime', key: 'overtime' },
  { title: 'Hours', dataIndex: 'hours', key: 'hours' },
  { title: 'Action', key: 'action' },
]

const dataSource = ref([
  { id: '001', project: 'Road Construction Project A', overtime: true, hours: '04:00' },
  { id: '002', project: 'Lighting Maintenanance Project B', overtime: false, hours: '04:00' },
  { id: '003', project: 'Project A', overtime: true, hours: '04:00' },
  { id: '004', project: 'Project B', overtime: 'Once', hours: '04:03' },
  { id: '005', project: 'Project C', overtime: false, hours: '04:00' },
  { id: '006', project: 'Project D', overtime: true, hours: '06:30' },
  { id: '007', project: 'Project E', overtime: false, hours: '08:00' },
  { id: '008', project: 'Project F', overtime: true, hours: '05:00' },
  { id: '009', project: 'Project G', overtime: false, hours: '09:00' },
  { id: '010', project: 'Project H', overtime: true, hours: '10:00' }
])

// 分页相关
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: dataSource.value.length,
  showSizeChanger: false
})

// 获取当前页数据
const getCurrentPageData = () => {
  const start = (pagination.value.current - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return dataSource.value.slice(start, end)
}

function handleDelete(record) {
  dataSource.value = dataSource.value.filter(item => item.id !== record.id)
  pagination.value.total = dataSource.value.length
  // 如果当前页数据被删光，自动跳到上一页
  if (getCurrentPageData().length === 0 && pagination.value.current > 1) {
    pagination.value.current--
  }
  message.success('Deleted!')
}

// 统计当前页每个项目的累计工时（小时为单位）
function getProjectHours() {
  const map = {}
  getCurrentPageData().forEach(item => {
    const name = item.project
    const hour = conversionTime(item.hours)
    map[name] = (map[name] || 0) + hour
  })
  return map
}
// 将"HH:MM"格式的时间转换为小时数（小数形式）
function conversionTime(hours) {
  if (!hours) return 0
  const [h, m] = hours.split(':').map(Number)
  return h + (m ? m / 60 : 0)
}

// 渲染柱状图
function renderChart() {
  var chartDom = document.getElementById('distribution');
  if (chartDom) {
    var myChart = echarts.init(chartDom);
    const projectHours = getProjectHours()
    var option = {
      title: {
        text: 'Project Hours Distribution',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: Object.keys(projectHours),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Hours',
          type: 'bar',
          barWidth: '60%',
          data: Object.values(projectHours)
        }
      ]
    };
    myChart.setOption(option);
  }
}

onMounted(() => {
  renderChart()
})

// 数据或分页变化时自动刷新图表
watch([dataSource, pagination], () => {
  renderChart()
}, { deep: true })

// 监听表格分页变化
function handleTableChange(pag) {
  pagination.value.current = pag.current
  renderChart()
}
</script>

<template>
  <div>
    <h2>Tasks</h2>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      row-key="id"
      bordered
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'overtime'">
          <span>
            <template v-if="record.overtime === true">Yes</template>
            <template v-else-if="record.overtime === false">No</template>
            <template v-else>{{ record.overtime }}</template>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button v-if="isShown" type="primary" size="small" @click="handleDelete(record)">Delete</a-button>
        </template>
      </template>
    </a-table>
    <div id="distribution"></div>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 16px;
}
#distribution {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
</style>
