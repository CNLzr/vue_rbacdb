<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
<template>
    <div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">商品</span>
                </template>
                <el-menu-item index="/#">商品列表</el-menu-item>
                <el-menu-item index="/#">添加商品</el-menu-item>
                <el-menu-item index="/#">商品分类</el-menu-item>
                <el-menu-item index="/#">商品类型</el-menu-item>
                <el-menu-item index="/#">品牌管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">订单</span>
                </template>
                <el-menu-item index="/#">订单设置</el-menu-item>
                <el-menu-item index="/#">订单列表</el-menu-item>
                <el-menu-item index="/#">退货申请处理</el-menu-item>
                <el-menu-item index="/#">退货原因设置</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">营销</span>
                </template>
                <el-menu-item index="/#">秒杀活动</el-menu-item>
                <el-menu-item index="/#">砍价活动</el-menu-item>
                <el-menu-item index="/#">团购活动</el-menu-item>
                <el-menu-item index="/#">人气推荐</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">权限</span>
                </template>
                <el-menu-item index="/users/list">
                    用户列表
                </el-menu-item>
                <el-menu-item index="/roles/list">
                    角色列表
                </el-menu-item>
                <el-menu-item index="/menus/list">
                    菜单列表
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>