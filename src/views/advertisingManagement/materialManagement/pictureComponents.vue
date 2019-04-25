<template>
    <div class="pictureComponents">
        <ul>
            <li>
                <a href="javascript:;" class="file">
                    <svg-icon icon-class="plus1"></svg-icon>
                    <p class="info">上传图片</p>
                    <input @change="uploadImg($event)" type="file" accept="image/jpg,image/jpeg,image/png" name=""></a>
            </li>
            <li v-for="(item,index) in lists" :key="index">
                <img :src="item.url" alt="">
                <div v-show="isShow" @click.stop.prevent="selOpi(index)">
                    <el-checkbox class="checked" v-model="item.checked"></el-checkbox>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import upload from "@/utils/upload";
    import Alert from "@/utils/alert";

    import {POST_RESOURCES, GET_RESOURCES, DELETE_RESOURCES} from '@/api/advertisingManagement'

    export default {
        name: "pictureComponents",
        data() {
            return {
                lists: [
                    // {
                    //     id: '132',
                    //     src: 'https://cdn.renqilai.com/2019_10_04/11_24_12_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181220160153.jpg',
                    //     checked: false
                    // },
                    // {
                    //     id: '133',
                    //     src: 'https://cdn.renqilai.com/2019_10_04/14_08_46_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190117141418.jpg',
                    //     checked: false
                    // },
                    // {
                    //     id: '134',
                    //     src: 'https://cdn.renqilai.com/2019_10_04/11_24_12_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181220160153.jpg',
                    //     checked: false
                    // },
                ],
                isShow: false,
                params : {
                    type: 'IMAGE',
                    from: 0,
                    size: 10
                }
            }
        },
        mounted() {
            this.getList();
        },
        props: ["activeName", "isSel", "allSel", "remove"],
        watch: {
            activeName() {
            },
            isSel() {

                /**
                 * 取消选择
                 */
                this.isShow = this.isSel;
                if (this.activeName == 'IMAGE') {
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
                if (this.activeName == 'IMAGE') {
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
                if (this.activeName == 'IMAGE') {
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
            getList() {
                let that = this;
                GET_RESOURCES(that.params).then(res => {
                    that.lists = res
                })
            },
            uploadImg(e) {
                let that = this;
                let files = e.target.files[0];
                upload(files).then(res => {
                    let obj = {
                        url: res.path,
                        type: 'IMAGE',
                        size: res.fsize,
                        key: res.key,
                        thumb: res.path
                    };
                    POST_RESOURCES(obj).then(res => {
                        Alert.success('上传成功');
                        this.getList();
                    });

                });
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

                img {
                    width: 100%;
                    height: 100%;
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
