<template>
    <div style="text-align:center">
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="current_page"
                    :page-sizes="[2,4,8,10]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        props:["total","current_page"],
        methods: {
            handleSizeChange(val) {
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
                currentPage: 1,
            };
        }
    }
</script>