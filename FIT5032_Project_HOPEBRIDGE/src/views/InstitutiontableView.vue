<template>
    <div>
        <h1>Australia Mental health Institute Information</h1>
        <!-- page Controls -->
         <div class="search-bar col-md-2">
            <input type="text" v-model="searchInput" class="form-control" placeholder="Search"/>
         </div>
        <div class="page-controls">
            <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === 20">Next</button>
            <!--shouldnt be hardcoded 20 but no idea how to change-->
        </div>
        <table class="table">
            <thead> <!--abbr table head-->
                <tr> <!--first row is header names-->
                    <th v-for="(header, index) in columns" :key="index" @click="sortTable(index)"
                        style="cursor:pointer;"><!--use sorttable func-->
                        {{ header }}
                        <span v-if="sortColumn === index">
                            <!--another block within the line, display after column name-->
                            {{ sortOrder === 'asc' ? '↑' : '↓' }}
                        </span>
                    </th>
                </tr><!--for loop to get every column name in table; th changes style to differ header and contents-->
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in search" :key="rowIndex">
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
            pageSize: 10,//limited content shown on page
            sortOrder: 'asc',
            searchInput: '',
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
        search() {
            if (this.searchInput === '') {
                return this.changePage;
            }
            return this.changePage.filter(row =>
                row.some(cell => cell.toLowerCase().includes(this.searchInput.toLowerCase()))
            );
        },
        changePage() {
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
                const response = await fetch('public/table/Mockdatamental.csv');
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

        sortTable(columnIndex) {

            if (columnIndex !== 0) {
                return;
            } //limited sorting fucntion only to amount of subsidy

            if (this.sortColumn === columnIndex) {
                // If already sorting by this column, reverse the order
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                // Otherwise, start sorting by this column in ascending order
                this.sortOrder = 'asc';
                this.sortColumn = columnIndex;
            }

            this.rows.sort((a, b) => {
                const valA = a[columnIndex];
                const valB = b[columnIndex];

                // Handle numeric sorting
                if (!isNaN(valA) && !isNaN(valB)) {
                    return this.sortOrder === 'asc'
                        ? valA - valB
                        : valB - valA;
                }

                // Handle string sorting
                return this.sortOrder === 'asc'
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            });
        },

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

th:hover {
    background-color: #e2e6ea;
}
</style>
