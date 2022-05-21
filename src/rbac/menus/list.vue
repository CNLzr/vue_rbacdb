<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;">
            <el-table-column
                    fixed
                    prop="menu_id"
                    label="菜单编号"
                    width="auto">
            </el-table-column>
            <el-table-column
                    prop="menu_name"
                    label="菜单名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="menu_url"
                    label="菜单URL"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="menu_pid"
                    label="父级编号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="menu_desc"
                    label="菜单描述"
                    width="120">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="auto">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        created() {
            this.getRoleList();
        },
        methods:{
            getRoleList(){
                this.$axios.get("/menus/list").then((res)=>{
                    console.log(res);
                    if(res.data.code === 2000){
                        let list = res.data.data;
                        for (let i = 0; i < list.length; i++) {
                            let menu = list[i];
                            let menu_pid = menu.parentMenu===null?"":menu.parentMenu.id;
                            let menu_obj = {
                                menu_id: menu.id,
                                menu_name: menu.name,
                                menu_url: menu.url,
                                menu_pid: menu_pid,
                                menu_desc: menu.desc,
                            };
                            this.tableData.push(menu_obj);
                        }
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            handleClick(row) {
                console.log(row);
            }
        },
        data() {
            return {
                tableData: []
            }
        }
    }
</script>