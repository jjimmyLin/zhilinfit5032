<template>
    <div>
        <h1>CSV Table Data</h1>
        <!-- page Controls -->
        <div class="page-controls">
            <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
        <table class="table">
            <thead> <!--abbr table head-->
                <tr> <!--first row is header names-->
                    <th v-for="(header, index) in columns" :key="index">{{ header }}</th>
                </tr><!--for loop to get every column name in table; th changes style to differ header and contents-->
            </thead>
            <tbody><!--abbr table body-->
                <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex"> <!-- 修改为 paginatedRows -->
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() { //for declaring required data
        return {
            columns: [],
            rows: [],
            currentPage: 1, //stores page num
            pageSize: 10//limited content shown on page
        };
    },
    mounted() {
        this.getData();
        //runs getdata to use table
    },
    computed: {
        //declaring datas with calculation (not simply declare a value)
        //here retudns ttlpages and 
        totalPages() {
            return Math.ceil(this.rows.length / this.pageSize);
        },
        paginatedRows() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.rows.slice(start, end);
        }
    },
    methods: {
        //for declaring/ruling a method/funciton
        //here is getData function
        async getData() {
            try {
                const response = await fetch('/table/MOCK_DATA 5032.csv');
                const csvText = await response.text();
                this.convertCSV(csvText);
            } catch (error) {
                console.error('Error loading CSV file:', error);
            }
        },
        convertCSV(input) {
            const lines = input.split('\n');

            //below headers and rows are used in temp
            this.columns = lines[0].split(',');
            this.rows = lines.slice(1).map(line => line.split(','));
        }, //split datas from csv and assign to data attrs above (headers and rows)

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    }
};
</script>

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa;
}

th,
td {
    border: 2px solid #ccc;
    padding: 8px;
    text-align: center;
    font-size: 20px;
}

/*th and td both use this setting */

.page-controls {
    margin-top: 10px;
    text-align: left;
}

button {
    margin: 0 10px;
    padding: 5px 10px;
}

button:disabled {
    cursor: not-allowed;
}
</style>
