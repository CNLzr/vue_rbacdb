<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;">
            <el-table-column
                    fixed
                    prop="user_id"
                    label="用户编号"
                    width="auto">
            </el-table-column>
            <el-table-column
                    prop="user_loginId"
                    label="用户登录名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="user_name"
                    label="用户姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="user_email"
                    label="用户邮箱"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="user_phone"
                    label="用户手机号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="user_address"
                    label="地址"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="role_id"
                    label="角色编号"
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
                this.$axios.get("/users/list").then((res)=>{
                    console.log(res);
                    if(res.data.code === 2000){
                        let list = res.data.data;
                        for (let i = 0; i < list.length; i++) {
                            let user = list[i];
                            let user_obj = {
                                user_id: user.id,
                                user_loginId: user.loginId,
                                user_name: user.name,
                                user_email: user.email,
                                user_phone: user.phone,
                                user_address: user.address,
                                role_id: user.role.id,
                            };
                            this.tableData.push(user_obj);
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