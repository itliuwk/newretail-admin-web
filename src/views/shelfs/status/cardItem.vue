<template>
    <div class="card">
        <div class="left">
            <img src="" alt="">
        </div>
        <div class="right">
            <div class="row1">
                <small>12</small>
                <strong class="title">统一红烧牛肉面</strong>
                <small class="label">编辑</small>
            </div>
            <div class="row2">
                <dl style="display: flex">
                    <dd>零售价: <strong>10¥</strong></dd>
                    <dd>会员价: <strong>10¥</strong></dd>
                </dl>
                <dl style="display: flex">
                    <dd>当前库存: <strong>123</strong></dd>
                    <dd>容量: <strong>190</strong></dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="scss" scoped>
    .card {
        width: calc(20% - 15px);
        margin-right: 15px;
        margin-bottom: 15px;
        display: flex;
        font-size: 12px;
        border: 1px solid #ddd;
        padding: 10px;

        .left {
            width: 50px;
            height: 50px;

            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .right {
            width: 100%;

            .row1 {
                width: 100%;
                align-items: center;
                display: flex;
                margin-bottom: 10px;

                .title {
                    padding-left: 5px;
                    flex: 1;
                }

                .label {
                    padding: 5px;
                    background: #eee;
                }
            }

            .row2 {
                dl {
                    margin-bottom: 5px;
                }

                dl > dd {
                    flex: 1;
                }
            }
        }

        &:nth-child(5n) {
            margin-right: 0;
        }

        /*5行，在1200的时候就已经开始切换*/
        @media screen and (max-width: 1200px) {
            width: calc(33.33% - 15px);
            &:nth-child(5n) {
                margin-right: 15px;
            }
            &:nth-child(3n) {
                margin-right: 0 !important;
            }
        }
    }
</style>