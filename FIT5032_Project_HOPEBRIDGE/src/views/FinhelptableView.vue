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
            headers: [], 
            rows: []
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                const response = await fetch('/table/MOCK_DATA 5032.csv');
                const csvText = await response.text();
                this.parseCSVData(csvText);
            } catch (error) {
                console.error('Error loading CSV file:', error);
            }
        },
        parseCSVData(csvText) {
            const lines = csvText.split('\n');
            this.headers = lines[0].split(',');
            this.rows = lines.slice(1).map(line => line.split(','));
        } //split datas from csv and assign to data attrs above (headers and rows)
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