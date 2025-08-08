# WrittenTest
# 缘石科技笔试题
框架为Vue3，UI 组件库为Ant Design Vue，图表库为ECharts
1. Delete按钮的显示
使用pinia存储用户名(未持久化)，定义变量isShouw通过计算用户名是否为'admin'赋值到变量，通过v-if控制是否显示Delete按钮
2. 
难点：表格内容与柱状图绑定
实现分页：获取当前页码减一，乘以页容量，得到开始位置，开始位置加页容量得到结束位置，使用slice截取得到显示内容
监听：通过监听分页数据(换页时)和总数据(删除时)，触发柱状图的渲染
柱状图：数据通过foreach获取，首次渲染在onMounted生命周期中，注意当删除和换页时触发渲染。

进入Test目录下
pnpm i 安装依赖
pnpm dev运行测试环境

在做时使用了Copilot