<template>
    <div>
        <div class="left" style="width: 20%;height:100%;position:fixed">
            <div class="logo" style="height: 10%;text-align: left;">
                Logo图片
            </div>
            <div>
                <MenuView></MenuView>
            </div>
        </div>
        <div class="right" style="width: 80%;height:100%;margin-left: auto;">
            <div class="head" style="height: 10%;text-align: right;">
                用户登录
            </div>
            <div class="main" style="height: 90%;margin-top: 30px">
                <router-view></router-view>
            </div>
            <div class="footer">
            </div>
        </div>
    </div>
</template>

<script>
    import MenuView from "./menu/menu.vue";
    export default{
        components:{
            MenuView,
        }
    }
</script>