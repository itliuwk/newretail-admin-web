<template>
    <div class="quxia">
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
        <div class="table">
            <div class="opi">
                <el-button v-show="stock=='true'" type="success" @click="openDoor">一键开门</el-button>
                <el-button v-show="stock=='true'" type="primary" @click="confrim">确定补货</el-button>
                <el-button v-show="stock=='false'" type="primary" @click="onRestocks">开门补货</el-button>
            </div>
            <el-table
                    :data="detailData.shelfs"
                    ref="multipleTable"
            >

                <el-table-column
                        type="index">
                </el-table-column>
                <el-table-column label="图片" prop="image">
                    <template slot-scope="scope">
                        <img :src="scope.row.image" alt="" width="70" height="70">
                    </template>
                </el-table-column>
                <el-table-column label="名字" prop="name">
                    <template slot-scope="scope">
                        <div>{{scope.row.name}}</div>
                    </template>
                </el-table-column>

                <el-table-column label="货道状态" prop="active">
                    <template slot-scope="scope">
                        <!--<div v-if="scope.row.state=='OUT_OF_STOCK'">-->
                            <!--<span class="state stateQ">缺货</span>-->
                        <!--</div>-->
                        <!--<div v-else>-->
                            <!--<span class="state stateZ">正常</span>-->
                        <!--</div>-->
                        <el-tooltip class="item" effect="dark" :content="content" placement="top">
                            <el-switch
                                    v-model="scope.row.checked"
                                    active-color="#409eff"
                                    inactive-color="#dcdfe6">
                            </el-switch>
                        </el-tooltip>
                        <span style="margin-left: 10px;" v-if="scope.row.state=='NORMAL'">正常</span>
                        <span style="margin-left: 10px;" v-else-if="scope.row.state=='ALERT'">缺货</span>
                        <span style="margin-left: 10px;" v-else="scope.row.state=='OUT_OF_STOCK'">售罄</span>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>

    import {GET_DEVICEINFO, POST_RESTOCKS, POST_OPENDOOR, POST_RESTOCKS_UPDATE} from '@/api/replenishment';
    import Alert from "@/utils/alert";

    export default {
        name: "quxia",
        content:'',
        data() {
            return {
                loading: false,
                detailData: {
                    deviceName: '',
                    province: '',
                    city: '',
                    district: '',
                    street: '',
                    locationName: '',
                },
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
            if (this.stock=='true'){
                this.content='点击确定补货才能真实修改'
            } else {
                this.content = '点击开门补货才能真实修改'
            }
        },
        methods: {
            getDetail(id) {
                GET_DEVICEINFO(id).then(res => {
                    res.shelfs.map((item, index) => {
                        if (item.state == 'NORMAL') {
                            item.checked = true;
                            item.isSel = true;
                        } else {
                            item.checked = false;
                            item.isSel = false;
                        }
                        item.index = index;
                        return item;
                    });
                    this.detailData = res;
                })
            },

            /**
             *
             * 选择的行
             */
            selChange(val) {
                console.log(val);
                this.detailData.shelfs.map((item, idx) => {
                    if (val == idx) {

                    }
                    return item;
                })
                // let restocks = [];
                // val.forEach(item => {
                //     restocks.push({
                //         number: item.number,
                //         amount: 1
                //     })
                // });
                // this.selSheLfs = restocks
            },
            /**
             *开门补货
             */
            onRestocks() {

                let restocks = [];
                this.detailData.shelfs.map((item, idx) => {
                    if (item.checked   && item.isSel == false) {
                        restocks.push({
                            number: item.number,
                            amount: 1
                        })
                    }
                });


                if (!restocks.length) {
                    Alert.fail('请选择补货商品');
                    return
                }

                Alert.confirm("确定开门补货吗？").then(res => {
                    let obj = {
                        deviceId: this.$route.query.id,
                        shelfs: restocks
                    };
                    POST_RESTOCKS({...obj}).then(res => {
                        Alert.success('补货成功');
                        setTimeout(() => {
                            this.getDetail(this.$route.query.id);
                        }, 1000)
                    })
                });

            },
            /**
             *确定补货
             */
            confrim() {
                let restocks = [];
                this.detailData.shelfs.forEach(item => {
                    if (item.checked) {
                        restocks.push({number: item.number, amount: 1})
                    } else {
                        restocks.push({number: item.number, amount: 0})
                    }
                });

                let obj = {
                    deviceId: this.$route.query.id,
                    shelfs: restocks
                };

                POST_RESTOCKS_UPDATE({...obj}).then(res => {
                    Alert.success('确定补货成功');
                    setTimeout(() => {
                        this.getDetail(this.$route.query.id);
                    }, 1000)
                })
            },
            /**
             * 一键开门
             */
            openDoor() {

                Alert.confirm("确定一键开门吗？").then(res => {
                    let doors = this.detailData.shelfs.map(item => {
                        return item.number
                    });
                    let obj = {
                        deviceId: this.$route.query.id,
                        doors
                    };
                    POST_OPENDOOR({...obj}).then(res => {
                        Alert.success('一键开门成功');
                    })
                })
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

    .table {
        padding: 20px;
        background: #fff;

        .state {
            display: inline-block;
            padding: 5px 10px;
            background: #f56c6c;
            border-radius: 10px;
            color: #fff;
        }

        .stateZ {
            background: #67c23a;
        }
    }
</style>
