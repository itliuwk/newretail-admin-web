<template>
    <div class="materialManagement">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div class="opi">
                        <div v-show="!isSel">
                            <el-button @click="batchOperation">批量选择</el-button>
                        </div>
                        <div v-show="isSel">
                            <el-button @click="selectAll">选择全部</el-button>
                            <el-button @click="deselected">取消选择</el-button>
                            <el-button type="danger" @click="removeItem">删除</el-button>
                        </div>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
                        <el-tab-pane label="图片" name="IMAGE">
                            <picture-components ref="pictureComponents" @removeEnd="removeEnd" :activeName="activeName" :allSel="allSel" :isSel="isSel" :remove="remove"></picture-components>
                        </el-tab-pane>
                        <el-tab-pane label="视频"  name="VIDEO">
                            <video-components ref="videoComponents"  @removeEnd="removeEnd" :activeName="activeName" :allSel="allSel" :isSel="isSel" :remove="remove"></video-components>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import PictureComponents from './pictureComponents'
    import VideoComponents from './videoComponents'

    export default {
        name: "index",
        data() {
            return {
                isSel: false,
                allSel:false,
                remove:false,
                activeName: 'IMAGE'
            };
        },
        components: {
            PictureComponents,
            VideoComponents
        },
        methods: {
            handleClick() {
                this.isSel = false;
            },
            batchOperation() {
                this.isSel = true;
            },
            deselected() {
                this.isSel = false;
                this.allSel = false;
                this.remove = false;
            },
            selectAll(){
                this.allSel = true;
            },
            removeItem(){
                this.remove = true;
            },
            removeEnd(){
                this.remove = false;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .materialManagement {
        background: #fff;
        padding: 20px;
    }

    .grid-content {
        position: relative;

        .opi {
            position: absolute;
            top: -10px;
            right: 0;
            z-index: 2;
        }
    }

    .el-tabs__content {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .el-tab-pane {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .el-tabs__nav-wrap::after {
        height: 1px;
    }
</style>
