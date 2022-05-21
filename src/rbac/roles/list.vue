<template>
    <div>
        <el-form :inline="true" :model="roleSearch" class="demo-form-inline">
            <el-form-item label="角色编号">
                <el-input v-model="roleSearch.id" placeholder="角色编号"></el-input>
            </el-form-item>
            <el-form-item label="角色名称">
                <el-input v-model="roleSearch.name" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
                <el-input v-model="roleSearch.desc" placeholder="角色描述"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="clear">重置</el-button>
                <el-button type="primary" @click="addPage">新增</el-button>
            </el-form-item>
        </el-form>
        <p></p>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="role_id"
                    label="角色编号"
                    width="auto">
            </el-table-column>
            <el-table-column
                    prop="role_name"
                    label="角色名称"
                    width="auto">
            </el-table-column>
            <el-table-column
                    prop="role_desc"
                    label="角色描述"
                    width="auto">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="auto">
                <template slot-scope="scope">
                    <el-button @click="editPage(scope.row)" size="small">编辑</el-button>
                    <el-button size="small" @click="deleteRole(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <PageVue @sizeChange="setMaxSzieOnePage" @currentChange="setCurrentPage" :total="total" :current_page="currentPage" v-if="isSearch === 0"></PageVue>
        <!--     编辑框   -->
        <el-dialog :title="title"
                   width="20%"
                   :visible.sync="dialogFormVisible"
                   >
            <el-form :model="roleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色编号"  v-if="status === 1">
                    <el-input
                            v-model="roleForm.id"
                            :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="name">
                    <el-input type="text" v-model="roleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="desc">
                    <el-input type="text" v-model.number="roleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editRole">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import PageVue from "../components/page.vue"
    export default {
        components:{
            PageVue
        },
        created() {
            this.getRoleList();
        },
        methods:{
            // 获取角色列表
            getRoleList(){
                this.currentPage = 1;
                this.maxSzieOnePage = 2;
                this.$axios.get("/roles/list/"+this.currentPage+"/"+this.maxSzieOnePage).then((res)=>{
                    console.log(res);
                    this.tableData = [];
                    if(res.data.code === 2000){
                        let list = res.data.data.list;
                        // 设置总页数
                        this.total = res.data.data.total;
                        for (let i = 0; i < list.length; i++) {
                            let role = list[i];
                            let role_obj = {
                                role_id: role.id,
                                role_name: role.name,
                                role_desc: role.desc,
                            };
                            this.tableData.push(role_obj);
                        }
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            handleClick(row) {
                console.log(row);
            },
            // 编辑框
            editPage(row) {
                this.dialogFormVisible = true;
                this.title = "编辑";
                this.status = 1;
                console.log(row);
                this.$axios.get("/roles/role/"+row.role_id).then((res)=>{
                    console.log(res);
                    if(res.data.code === 2000){
                        this.roleForm.id = row.role_id;
                        this.roleForm.name = row.role_name;
                        this.roleForm.desc = row.role_desc;
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            // 角色操作
            editRole(){
                this.dialogFormVisible = false;
                console.log(this.roleForm);
                if(this.status === 1){ // 编辑操作
                    this.$axios.put("/roles/role",this.roleForm).then((res)=>{
                        console.log(res);
                        if(res.data.code === 2000){
                            console.log("编辑成功");
                            this.tableData = [];
                            this.getRoleList();
                        }
                    }).catch((error)=>{
                        console.log(error);
                    });
                }else if(this.status === 0){ // 新增操作
                    console.log("roleForm",this.roleForm);
                    let roleForm = {
                        id:null,
                        name:this.roleForm.name,
                        desc:this.roleForm.desc
                    };
                    this.$axios.post("/roles/role",roleForm).then((res)=>{
                        console.log(res);
                        if(res.data.code === 2000){
                            console.log("新增成功");
                            this.tableData = [];
                            this.roleForm = {};
                            this.getRoleList();
                        }
                    }).catch((error)=>{
                        console.log(error);
                    });
                }

            },
            // 删除操作
            deleteRole(row){
                console.log(row);
                this.$axios.delete("/roles/role/"+row.role_id).then((res)=>{
                    console.log(res);
                    if(res.data.code === 2000){
                        console.log("删除成功");
                        this.tableData = [];
                        this.getRoleList();
                    }
                }).catch((error)=>{
                    console.log(error);
                });
            },
            // 新增框
            addPage(){
                this.title = "新增";
                this.dialogFormVisible = true;
                this.status = 0;
                this.roleForm = {};
            },
            setMaxSzieOnePage(val){
                this.tableData = [];
                this.maxSzieOnePage = val;
                this.$axios.get("/roles/list/1/"+this.maxSzieOnePage).then((res)=>{
                    console.log(res);
                    if(res.data.code === 2000){
                        let list = res.data.data.list;
                        for (let i = 0; i < list.length; i++) {
                            let role = list[i];
                            let role_obj = {
                                role_id: role.id,
                                role_name: role.name,
                                role_desc: role.desc,
                            };
                            this.tableData.push(role_obj);
                        }
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            setCurrentPage(val){
                this.tableData = [];
                this.currentPage = val;
                this.$axios.get("/roles/list/"+this.currentPage+"/"+this.maxSzieOnePage).then((res)=>{
                    console.log(res);
                    if(res.data.code === 2000){
                        let list = res.data.data.list;
                        for (let i = 0; i < list.length; i++) {
                            let role = list[i];
                            let role_obj = {
                                role_id: role.id,
                                role_name: role.name,
                                role_desc: role.desc,
                            };
                            this.tableData.push(role_obj);
                        }
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            search() {
                this.isSearch = 1;
                console.log(this.roleSearch);
                if(this.roleSearch.id === "" && this.roleSearch.name === "" && this.roleSearch.desc === ""){
                    this.getRoleList();
                    this.isSearch = 0;
                    return;
                }
                this.$axios.post("/roles/role/search",this.roleSearch).then((res)=>{
                    this.tableData = [];
                    console.log(res);
                    if(res.data.code === 2000){
                        let list = res.data.data;
                        for (let i = 0; i < list.length; i++) {
                            let role = list[i];
                            let role_obj = {
                                role_id: role.id,
                                role_name: role.name,
                                role_desc: role.desc,
                            };
                            this.tableData.push(role_obj);
                        }
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            clear(){
                this.roleSearch = {
                        id: '',
                        name: '',
                        desc:''
                }
            }
        },
        data() {
            return {
                total:0,
                currentPage:1,
                maxSzieOnePage:2,
                tableData: [],
                dialogFormVisible:false,
                roleForm:{
                    id:'',
                    name:'',
                    desc:''
                },
                title:"",
                // 如果为1则是编辑状态，如果为0则是新增状态
                status:"",
                roleSearch: {
                    id: '',
                    name: '',
                    desc:''
                },
                isSearch:0,
            }
        }
    }
</script>