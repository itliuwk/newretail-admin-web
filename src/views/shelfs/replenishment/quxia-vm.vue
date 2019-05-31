<template>
    <div class="quxia-vm">
        <div class="infoDetail">
            <div class="infoDetailTit"><span>编号:</span><span>{{$route.query.id}}</span></div>
            <div class="infoDetailTit" v-if="detailData.deviceName"><span>设备名称:</span><span
            >{{detailData.deviceName}}</span></div>
            <div class="infoDetailTit" v-if="detailData.province"><span>地址:</span><span>{{detailData.province + detailData.city + detailData.district +detailData.street +detailData.locationName}}</span>
            </div>
            <div class="infoDetailTit">
                <span>状态:</span>
                <span v-if="detailData.active">在线</span>
                <span v-if="!detailData.active">离线</span>
            </div>
        </div>
        <div class="content">
            <div>
                <!--<el-select style="margin-right: 30px;" @change="toggleShelfs" v-model="value" placeholder="请选择">-->
                <!--<el-option label="全部" value="all">全部</el-option>-->
                <!--<el-option label="缺货" value="shortage"></el-option>-->
                <!--</el-select>-->

                <el-button type="primary" @click="onFillReplenishNum">一键补满</el-button>
                <el-button type="info" @click="onResetReplenishNum">重置</el-button>
                <el-button type="success" @click="confrim">确定补货</el-button>
            </div>

            <div v-if="!shelfs.length" style="text-align: center;">暂无数据,请配置货道</div>
            <div v-for="(item,index)  in shelfs" :key="index">
                <div class="row">
                    <h2>第{{index +1}}层</h2>
                    <div class="row-content-container">
                        <template v-for="(items,idx) in item.items">

                            <div class="listItem" v-if="items.isShow">
                                <div v-if="items.isEdit" class="editBtns"></div>
                                <div class="row-container-item">
                                    <img :src="items.image"
                                         class="left img" alt="">
                                    <div>
                                        <h5>{{items.name}}</h5>
                                        <p><span>货道号: {{index +1}}{{idx}}</span><span> 零售价: ￥{{items.price}}</span></p>
                                        <p><span>容量: {{items.stock}}</span><span> 最大容量: {{items.maxStock}}</span>
                                        </p>
                                    </div>
                                    <span class="shortage" v-if="items.state=='OUT_OF_STOCK'">缺货</span>
                                </div>
                                <div style="text-align: center;">
                                    <el-input-number size="medium" style="margin-top: 5px;" :min="0"
                                                     :max="items.maxStock"
                                                     v-model="items.replenishNum"
                                                     @change="handleChange($event,items.curr)"></el-input-number>
                                    <span v-show="items.isEdit" style="margin-left: 10px;">{{ items.replenishNum - items.stock}} 件</span>
                                </div>

                            </div>
                        </template>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>

    import {GET_DEVICEINFO, POST_RESTOCKS} from '@/api/replenishment';
    import Alert from "@/utils/alert";

    export default {
        name: "quxia-vm",
        data() {
            return {
                num1: 10,
                value: 'all',
                loading: false,
                detailData: {
                    deviceName: '',
                    province: '',
                    city: '',
                    district: '',
                    street: '',
                    locationName: '',
                },
                isFillUp: false,
                shelfs: [],
                selSheLfs: []
            }
        },
        computed: {
            stock() {
                return this.$route.query.stock
            }
        },
        mounted() {
            this.getDetail(this.$route.query.id);
        },
        methods: {
            getDetail(id) {
                GET_DEVICEINFO(id).then(res => {
                    let shelfs = res.rows.map((item, index) => {
                        item.items.map((items, idx) => {
                            items.curr = `${index}:${idx}`;
                            items.replenishNum = items.stock;
                            items.isShow = true;
                            items.isEdit = false;
                            return items;
                        });
                        return item
                    });
                    this.detailData = res;
                    this.shelfs = shelfs
                })
            },

            handleChange(e, curr) {

                let x = curr.slice(':')[0];
                let y = curr.slice(':')[2];
                if (this.shelfs[x].items[y].replenishNum == this.shelfs[x].items[y].stock) {
                    this.shelfs[x].items[y].isEdit = false
                } else {
                    this.shelfs[x].items[y].isEdit = true
                }


            },

            /**
             *确定补货
             */
            confrim() {
                let newShelfs = [];
                let shelfs = this.shelfs.map(item => {
                    item.items.map(items => {
                        newShelfs.push(items)
                    });
                    return item;
                });

                newShelfs = newShelfs.filter(item => {
                    return item.replenishNum != item.stock
                });

                newShelfs = newShelfs.map(item => {
                    return {
                        number: item.number,
                        amount: item.replenishNum - item.stock
                    }
                });

                if (!newShelfs.length) {
                    Alert.fail('请请选择需要补货的货道');
                    return false;
                }

                let obj = {
                    deviceId: this.$route.query.id,
                    shelfs: newShelfs
                };

                POST_RESTOCKS({...obj}).then(res => {
                    Alert.success('确定补货成功');
                    setTimeout(() => {
                        this.getDetail(this.$route.query.id);
                    }, 500)
                })
            },

            /**
             * 重置
             */
            onResetReplenishNum() {
                let shelfs = this.shelfs;
                shelfs.forEach(item => {
                    item.items.forEach(items => {
                        items.replenishNum = items.stock;
                        items.isEdit = false;
                    })
                });

                this.shelfs = shelfs;
                this.isFillUp = false;

            },

            /**
             * 一键补满
             */
            onFillReplenishNum() {

                let shelfs = this.shelfs,
                    isCanNext, len = shelfs.length,
                    isFillUp = this.isFillUp;


                for (let i = 0; i < len; i++) {
                    const res1 = shelfs[i].items;
                    for (let j = 0; j < res1.length; j++) {
                        const res2 = res1[j];


                        if (res2.replenishNum == res2.maxStock) {
                            res2.isEdit = false;
                        } else {
                            res2.isEdit = true;
                        }


                        if (res2.replenishNum == res2.maxStock) {
                            isCanNext = true;
                        } else {
                            isCanNext = false;
                        }


                    }
                }


                if (isFillUp) {
                    if (isCanNext) {
                        Alert.fail('货物已经补满，无需补货');
                        return;
                    }
                }


                this.isFillUp = true;


                shelfs = shelfs.map(item => {
                    item.items.map(items => {
                        items.replenishNum = items.maxStock;
                        return items
                    });
                    return item;
                });


            },


            // 全部 and  确实 切换
            toggleShelfs(val) {
                let isFilterOutOfStock = val == 'all' ? false : true;

                let shelfs = this.shelfs;

                for (let i = 0; i < shelfs.length; i++) {
                    let res1 = shelfs[i].items;
                    for (let j = 0; j < res1.length; j++) {
                        const res2 = res1[j];
                        if (isFilterOutOfStock) {
                            if (res2.state == "OUT_OF_STOCK") {
                                res1[j].isShow = true
                            } else {
                                res1[j].isShow = false
                            }
                        } else {
                            res1[j].isShow = true
                        }
                    }
                }

                this.shelfs = shelfs

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .infoDetail {
        padding: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #d3dce6;
        background: #fff;

        .infoDetailTit {
            display: inline-block;
            width: 33%;
            margin: 10px 0;

            span:nth-child(1) {
                padding-right: 10px;
                color: #8492a6;
            }

            span:nth-child(2) {
                color: #324057;
            }
        }
    }

    .content {
        padding: 20px;
        background: #fff;

        .row {
            margin: 20px 0;

            h2 {
                margin: 10px 0;
            }

            .row-content-container {
                display: flex;
                flex-wrap: wrap;

                .listItem {
                    width: calc(20% - 20px);
                    margin-right: 20px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin-bottom: 20px;
                    position: relative;

                    .editBtns {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 100%;
                        height: 100%;
                        background: #bdeca27d;
                    }

                    .row-container-item {
                        display: flex;
                        position: relative;

                        .left.img {
                            width: 60px;
                            height: 60px;
                            margin-right: 5px;
                        }

                        h5, p {
                            margin: 0;
                            padding: 0;
                        }

                        p {
                            line-height: 20px;
                        }

                        span {
                            font-size: 14px;
                        }

                        .shortage {
                            display: inline-block;
                            border-radius: 10px;
                            background: #f56c6c;
                            line-height: 20px;
                            text-align: center;
                            color: #fff;
                            width: 40px;
                            height: 20px;
                            position: absolute;
                            top: 20px;
                            right: 0;
                        }
                    }
                }
            }
        }


    }
</style>
