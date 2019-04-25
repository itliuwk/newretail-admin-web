<template>
    <div class="selector">
        <div class="selector-check">
            <ul>
                <li v-for="(item,index) in lists" :key="index">
                    <video v-if="currType=='VIDEO'" :src="item.url"></video>
                    <img v-else :src="item.url"/>
                    <div @click.stop.prevent="selOpi(index)">
                        <el-checkbox class="checked" v-model="item.checked"></el-checkbox>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {GET_RESOURCES} from '@/api/advertisingManagement'

    export default {
        name: "elTransfer",
        data() {
            return {
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
                params: {
                    type: 'IMAGE',
                    from: 0,
                    size: 10
                }
            }
        },
        props: ['currType', 'resources'],
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                let params = {
                    ...this.params,
                    type: this.currType
                };
                GET_RESOURCES(params).then(res => {
                    res.map((item) => {
                        item.checked = false;
                        if (this.resources.includes(item.url)) {
                            item.checked = true;
                        }

                        return item;
                    });
                    this.lists = [...this.lists, ...res];
                })
            },
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
        },


    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .selector {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 20px;

        .selector-check {
            overflow: hidden;

            ul {
                overflow: hidden;

                li {
                    float: left;
                    width: 160px;
                    height: 118px;
                    list-style: none;
                    position: relative;
                    margin: 0 5px;

                    video {
                        width: 100%;
                        height: 100%;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    div {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }
            }
        }
    }
</style>
