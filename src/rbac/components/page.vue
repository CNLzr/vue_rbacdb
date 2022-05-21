<template>
    <div style="text-align:center">
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="current_page"
                    :page-sizes="[2,4,8,10]"
                    :page-size="page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        props:["total","current_page","page_size"],
        methods: {
            handleSizeChange(val) {
                console.log("选择的条页：",val);
                this.$emit("sizeChange",val);
                this.currentPage=1;
            },
            handleCurrentChange(val) {
                this.$emit("currentChange",val);
                this.currentPage = val;
            }
        },
        data() {
            return {
                currentPage: this.current_page,
            };
        },
        watch:{
            current_page:function (newData, oldData) {
                console.log(newData);
                console.log(oldData);
                this.currentPage = newData;
            },
            total:function (newData, oldData) {
                console.log(newData);
                this.total = newData;
            },
            page_size:function (newData, oldData) {
                console.log(newData);
                this.page_size = newData;
            }
        }
    }
</script>