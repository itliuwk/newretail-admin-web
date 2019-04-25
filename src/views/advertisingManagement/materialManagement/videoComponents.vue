<template>
    <div class="pictureComponents">
        <ul>
            <li>
                <a href="javascript:;" class="file">
                    <svg-icon icon-class="plus1"></svg-icon>
                    <p class="info">上传视频</p>
                    <input @change="uploadImg($event)" type="file" accept="video/*,audio/*" name=""></a>
            </li>
            <li v-for="(item,index) in lists" :key="index" @click="clickVideoUrl(item.url,item.name)">
                <video :src="item.url"></video>
                <span class="bofang">
                      <svg-icon icon-class="bofang"></svg-icon>
                </span>
                <div v-show="isShow" @click.stop.prevent="selOpi(index)">
                    <el-checkbox class="checked" v-model="item.checked"></el-checkbox>
                </div>
            </li>
        </ul>

        <el-dialog :visible.sync="detialPlayVideo" :title="title" v-if="state" @close="close">
            <player :video-url="videoUrl"></player>
        </el-dialog>
    </div>
</template>

<script>
    import upload from "@/utils/upload";
    import Alert from "@/utils/alert";
    import player from './videoPlay'

    import {POST_RESOURCES, GET_RESOURCES, DELETE_RESOURCES} from '@/api/advertisingManagement'

    export default {
        name: "videoComponents",
        data() {
            return {
                detialPlayVideo: false,
                title: '',
                state: true,
                lists: [
                    // {
                    //     id: '132',
                    //     src: 'https://cdn.renqilai.com/2019_10_04/14_11_15_%E7%A6%8F%E8%A2%8B%E6%9C%BA%E8%A7%86%E9%A2%91.mp4',
                    //     name: '2019_10_04/14_15_34_福袋机视频.mp4',
                    //     checked: false
                    // },
                    // {
                    //     id: '133',
                    //     name: '2019_10_04/14_16_32_something just like this.mp4',
                    //
                    //     src: 'https://cdn.renqilai.com/2019_10_04/14_12_01_something%20just%20like%20this.mp4',
                    //     checked: false
                    // },
                    // {
                    //     id: '134',
                    //     name: '2019_10_04/14_14_50_Wolves.mp4',
                    //     src: 'https://cdn.renqilai.com/2019_10_04/14_14_50_Wolves.mp4',
                    //     checked: false
                    // }
                ],
                videoUrl: '',
                isShow: false,
                params : {
                    type: 'VIDEO',
                    from: 0,
                    size: 10
                }
            }
        },
        props: ["activeName", "isSel", "allSel", "remove"],
        components: {
            player
        },
        mounted(){
            this.getList();
        },
        watch: {
            activeName() {
            },
            isSel() {

                /**
                 * 取消选择
                 */
                this.isShow = this.isSel;
                if (this.activeName == 'VIDEO') {
                    if (!this.isSel) {
                        let lists = [];
                        this.lists.map((item) => {
                            item.checked = false;
                            lists.push(item);
                            return item
                        });
                        this.lists = lists;
                    }
                }
            },
            allSel() {

                /**
                 * 选择全部
                 */
                if (this.activeName == 'VIDEO') {
                    if (this.allSel) {
                        let lists = [];
                        this.lists.map((item) => {
                            item.checked = true;
                            lists.push(item);
                            return item
                        });
                        this.lists = lists;
                    }
                }
            },
            remove() {
                let that = this;
                /**
                 * 删除
                 */
                if (this.activeName == 'VIDEO') {
                    if (this.remove) {
                        let lists = [];
                        let ids = [];
                        this.lists.map((item) => {
                            if (item.checked) {
                                ids.push(item.id);
                            }
                            return item
                        });

                        let obj = {
                            ids
                        };

                        DELETE_RESOURCES(obj).then(res=>{
                            that.lists = lists;
                            Alert.success('删除成功');
                            this.getList();
                            that.$emit('removeEnd');
                        });

                    }
                }
            }
        },
        methods: {
            getList(){
                let that = this;
                GET_RESOURCES(that.params).then(res=>{
                    that.lists = res
                })
            },
            uploadImg(e) {
                let that = this;
                let files = e.target.files[0];
                Alert.success('上传中...');
                upload(files).then(res => {
                    let obj = {
                        url: res.path,
                        type: 'VIDEO',
                        size: res.fsize,
                        key: res.key,
                        thumb: res.path
                    };
                    POST_RESOURCES(obj).then(res => {
                        //that.lists.push(obj);
                        Alert.success('上传成功');
                        this.getList();
                    });

                });
            },
            clickVideoUrl(src, name) {
                this.state = true;
                this.detialPlayVideo = true;
                this.videoUrl = src;
                this.title = name
            },
            close() {
                this.state = false
            },
            /**
             * 单个选择
             */
            selOpi(idx) {
                let lists = [];
                let checked = this.lists[idx].checked;
                if (checked) {
                    this.lists.map((item, index) => {
                        if (idx == index) {
                            item.checked = false
                        }
                        lists.push(item);
                        return item
                    });
                } else {
                    this.lists.map((item, index) => {
                        if (idx == index) {
                            item.checked = true
                        }
                        lists.push(item);
                        return item
                    });
                }

                this.lists = lists;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .pictureComponents {
        background: #fff;
        width: 100%;
        height: 100%;
        overflow: hidden;

        ul {
            overflow: hidden;

            li {
                position: relative;
                list-style: none;
                float: left;
                width: 218px;
                height: 118px;
                margin: 8px;
                cursor: pointer;

                video {
                    width: 100%;
                    height: 100%;
                }
                .bofang{
                    position: absolute;
                    top: 50px;
                    left: 95px;
                    .svg-icon{
                        font-size: 30px;
                        color: #fff;
                    }
                }

                > div {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, .5);

                    .checked {
                        width: 100%;
                        height: 100%;
                    }
                }

                .file {
                    position: relative;
                    top: 0;
                    display: inline-block;
                    border: 2px dotted #d9d9d9;
                    border-radius: 4px;
                    overflow: hidden;
                    color: #1E88C7;
                    text-decoration: none;
                    text-indent: 0;
                    width: 217px;
                    height: 118px;
                    text-align: center;
                    line-height: 86px;
                    font-size: 40px;
                    svg{
                        font-size: 40px;
                        color:  rgba(181,181,181,1);
                    }
                    .info {
                        position: absolute;
                        font-size: 20px;
                        top: 62px;
                        left: 66px;
                        color: #ccc;
                        line-height: normal;
                    }

                    input {
                        position: absolute;
                        font-size: 100px;
                        right: 0;
                        top: 0;
                        opacity: 0;
                        cursor: pointer;
                    }
                }
            }
        }

    }

</style>
