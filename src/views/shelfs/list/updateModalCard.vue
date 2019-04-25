<template>
    <div class="updateModal">
        <div class="row row1">
            <h3 style="padding-bottom: 10px;">现有商品</h3>
            <div class="container">
                <div class="item">
                    <small>1</small>
                    <span>统一红烧牛肉面</span>
                </div>
                <div class="item">
                    <small>1</small>
                    <span>统一红烧牛肉面</span>
                </div>
                <div class="item">
                    <small>1</small>
                    <span>统一红烧牛肉面</span>
                </div>
            </div>
        </div>
        <div class="row" style="padding-top: 10px;">
            <h3>更换商品</h3>
            <div class="item">
                <span class="label">商品名称:</span>
                <el-input placeholder="商品名称"></el-input>
            </div>
            <div class="item">
                <span class="label">零售价:</span>
                <el-input placeholder="零售价"></el-input>
            </div>
            <div class="item">
                <span class="label">会员价:</span>
                <el-switch v-model="switchvalue">
                </el-switch>
            </div>
            <div v-if="switchvalue">
                <el-input placeholder="请输入商品会员价"></el-input>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                switchvalue: false
            }
        }
    }
</script>
<style lang="scss" scoped>
    .updateModal {
        .row {
            h3 {
                padding-bottom: 5px;
            }

            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;

            &:last-child {
                border-bottom: none;
            }

            .item {
                display: flex;
                align-items: center;
                padding-bottom: 10px;

                .label {
                    width: 80px
                }


            }
        }

        .row1 {
            .item {
                height: 25px;

                small {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 20px;
                    height: 20px;
                    background: #eee;
                    border-radius: 100%;
                    padding: 5px;
                    margin-right: 10px;
                }
            }
        }
    }
</style>