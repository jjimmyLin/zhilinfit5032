<template>
    <div>
        <h1>CSV Table Data</h1>
        <table>
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            headers: [], // 保存表格的列名
            rows: [] // 保存表格的数据行
        };
    },
    mounted() {
        this.loadCSVData(); // 组件加载时调用
    },
    methods: {
        async loadCSVData() {
            try {
                // 使用 fetch 从 assets 目录获取 CSV 文件
                const response = await fetch(require('@/assets/table/MOCK_DATA 5032.csv'));
                const csvText = await response.text(); // 获取文本内容
                this.parseCSVData(csvText); // 解析 CSV
            } catch (error) {
                console.error('Error loading CSV file:', error);
            }
        },
        parseCSVData(csvText) {
            // 按行分割 CSV 文本
            const lines = csvText.split('\n');
            // 第一行是表头
            this.headers = lines[0].split(',');
            // 其余行是表格数据
            this.rows = lines.slice(1).map(line => line.split(','));
        }
    }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}
</style>