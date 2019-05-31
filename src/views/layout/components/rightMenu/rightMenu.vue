<template>
    <div class="rightMenu">
        <el-popover
                placement="top-start"
                title=""
                width="100"
                trigger="click"
        >
            <!-- content -->
            <div class="popucontent">
                <div class="list">
                    <!--<div class="listitem">个人资料</div>-->
                    <!--<div class="listitem last2">设置</div>-->
                    <div @click="logout" class="listitem last">退出</div>
                </div>
            </div>
            <div
                    class="avtarWrapper"
                    slot="reference"
            >
                <span class="text">{{this.$store.state.user.user || user}}</span>
                <div class="avatarContainer">
                    <img
                            :src="logoSrc"
                            alt=""
                    >
                </div>
            </div>
        </el-popover>

    </div>
</template>
<script>
    import logoSrc from '@/assets/quxia.png'
    import { getCookie } from "../../../../utils/cookie";
    import { mapState, mapActions } from "vuex";
    export default {
        data(){
          return{
              logoSrc:logoSrc,
              user:''
          }
        },
        mounted(){
         let LoginByUsername =  getCookie('LoginByUsername');
            this.user = JSON.parse(LoginByUsername).username
        },
        methods: {
            ...mapActions([
                "delAllVisitedViews"
            ]),
            getCookie(name) {
                let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)){
                    return true;
                    // return (arr[2]);
                }else{
                    return false
                }
            },
            logout() {
                let exp = new Date();
                exp.setTime(exp.getTime() - 1);
                let Cookie = this.getCookie('access_token');
                if (Cookie != null) {
                    document.cookie = 'access_token' + "=" + Cookie + ";expires=" + exp.toGMTString();
                }
                this.delAllVisitedViews();
                setTimeout(() => {
                    this.$router.push('/login')
                }, 100)
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@/styles/variables.scss";

    .popucontent {
        .list {
            width: 100%;

            .listitem {
                height: 30px;
                display: flex;
                align-items: center;
                padding-left: 10px;
                cursor: pointer;

                &:hover {
                    background: $menuActiveText;
                    color: #fff;
                }

                &.last2 {
                    height: 35px;
                }

                &:last-child {
                    /*border-top: 1px solid #ddd;*/
                }
            }
        }
    }

    .rightMenu {
        float: right;
        height: 100%;
        display: flex;
        justify-self: center;
        align-items: center;
        padding-right: 20px;

        .avtarWrapper {
            display: flex;
            justify-self: center;
            align-items: center;

            .text {
                padding-right: 5px;
            }

            .avatarContainer {
                width: 40px;
                height: 40px;
                background: #eee;
                border-radius: 100%;

                img {
                    width: 40px;
                    height: 40px;
                    background: #eee;
                    border-radius: 100%;
                }
            }
        }
    }
</style>
