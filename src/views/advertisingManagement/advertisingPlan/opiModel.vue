<template>
    <div class="form">
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="广告类型" prop="type">
                <el-select v-model="ruleForm.type" @change="selAdvertisingType" placeholder="广告类型">
                    <el-option label="图片" value="IMAGE"></el-option>
                    <el-option label="视频" value="VIDEO"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isTime" label="间隔时间(秒)" prop="interval"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input type="number" v-model="ruleForm.interval"></el-input>
            </el-form-item>
            <el-form-item label="设备类型" prop="deviceTypeId"
            >
                <el-select v-model="ruleForm.deviceTypeId" placeholder="设备类型" @change="selEquipmentType">
                    <el-option v-for="item in equipmentType" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告位类型" prop="adSpaceTypeId"
            >
                <el-select v-model="ruleForm.adSpaceTypeId" placeholder="广告位类型">
                    <el-option v-for="item in advertisingSpaceType" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备" prop="equipment">
                <span style="cursor: pointer;" v-if="!ruleForm.deviceIds.length" @click="addEquipment=true">选择设备</span>
                <span style="cursor: pointer;" v-else @click="addEquipment=true">{{ruleForm.deviceIds.length}}个设备</span>
                <!--<div v-if="!ruleForm.equipment.length" class="el-form-item__error">-->
                <!--不能为空-->
                <!--</div>-->
            </el-form-item>
            <el-form-item label="素材" prop="resources">
                <span v-if="!ruleForm.resources.length" style="cursor: pointer;" @click="clickMaterial">选择素材</span>
                <span v-else style="cursor: pointer;" @click="clickMaterial">已选{{ruleForm.resources.length}}个素材</span>
                <!--<div v-if="!ruleForm.sourceMaterial.length" class="el-form-item__error">-->
                <!--不能为空-->
                <!--</div>-->
            </el-form-item>
            <div class="selector" v-if="ruleForm.resources.length">
                <p class="selectedMaterial" style="padding-left: 50px;">已选素材</p>
                <div class="selector-check">
                    <ul v-if="!isTime">
                        <li v-for="(item,index) in ruleForm.resources" :key="index"
                            @click="clickVideoUrl(item)" style="cursor: pointer;">
                            <video :src="item"></video>
                            <span class="bofang">
                              <svg-icon icon-class="bofang"></svg-icon>
                             </span>
                        </li>
                    </ul>
                    <ul v-else>
                        <li v-for="(item,index) in ruleForm.resources" :key="index">
                            <img :src="item"/>
                        </li>
                    </ul>
                </div>
            </div>
            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="submitForm('ruleForm')">{{submitTitle}}</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>


        <el-dialog
                width="300px"
                :visible.sync="addEquipment">
            <add-equipment ref="transfer" :deviceIds="ruleForm.deviceIds" v-if="addEquipment"></add-equipment>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addEquipment = false">取消</el-button>
                <el-button type="primary" @click="determine">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog
                width="800px"
                :visible.sync="addSourceMaterial">
            <select-material ref="selectMaterial" :currType="type" :resources="ruleForm.resources" v-if="addSourceMaterial"></select-material>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addSourceMaterial = false">取消</el-button>
                <el-button type="primary" @click="determineSelectMaterial">确定</el-button>
            </div>
        </el-dialog>


        <el-dialog :visible.sync="detialPlayVideo" :title="title" v-if="state" @close="close">
            <player :video-url="videoUrl"></player>
        </el-dialog>
    </div>
</template>
<script>
    import {EQUIPMENTTYPE, ADVERTISINGSPACETYPE, POST_LIST, DETAIL_LIST, PUT_LIST} from '@/api/advertisingManagement'
    import Alert from "@/utils/alert";
    import addEquipment from "./addEquipment.vue"
    import selectMaterial from "./selectMaterial.vue"
    import player from '../materialManagement/videoPlay'
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                submitTitle:'立即创建',
                detialPlayVideo: false,
                state: false,
                videoUrl: '',
                addEquipment: false,
                addSourceMaterial: false,
                isTime: true,
                ruleForm: {
                    name: '',
                    type: 'IMAGE',
                    interval: '',
                    deviceTypeId: '',
                    adSpaceTypeId: '',
                    deviceIds: [],
                    resources: []
                },
                equipmentType: '',
                advertisingSpaceType: '',
                equipment: '',
                type: '',
                deviceTypeId: ''
            };
        },
        components: {
            addEquipment,
            selectMaterial,
            player
        },
        mounted() {
            this.getEquipmentType();
            this.DETAIL_LIST();

        },
        methods: {
            ...mapActions(["delVisitedView"]),
            /**
             * 确定
             */
            submitForm(formName) {
                let that = this;
                let id = this.$route.query.id;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (id) {
                            this.ruleForm.id = id;
                            PUT_LIST(this.ruleForm).then(res => {
                                Alert.success('更新成功');
                                setTimeout(() => {
                                    that.delVisitedView(that.$route).then(res => {
                                        that.$router.go(-1);
                                    });
                                }, 500)
                            });
                        } else {
                            POST_LIST(this.ruleForm).then(res => {
                                Alert.success('添加成功');
                                setTimeout(() => {
                                    that.delVisitedView(that.$route).then(res => {
                                        that.$router.go(-1);
                                    });
                                }, 500)
                            });
                        }

                    }
                });


            },

            DETAIL_LIST() {
                let id = this.$route.query.id;
                if (id == undefined) {
                    return
                }
                this.submitTitle = '立即更新';
                let params = {
                    id
                };
                DETAIL_LIST(params).then(res => {
                    this.ruleForm = res;
                    this.isTime = res.type != 'VIDEO';
                })
            },

            /**
             * 重置
             */

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            /**
             * 获取广告位类型
             */
            getAdvertisingSpaceType() {
                let params = {
                    deviceTypeId: this.deviceTypeId
                };
                ADVERTISINGSPACETYPE(params).then(res => {
                    console.log(res);
                    this.advertisingSpaceType = res
                });
            },

            /**
             *  获取设备
             */
            getEquipmentType() {
                EQUIPMENTTYPE().then(res => {
                    res.unshift({
                        id: '',
                        name: '请选择'
                    });
                    this.equipmentType = res;
                });
            },

            /**
             * 广告类型 change
             * @param e
             */
            selAdvertisingType(e) {
                if (e == 'IMAGE') {
                    this.isTime = true;
                } else {
                    this.isTime = false;
                }

                this.ruleForm = {
                    ...this.ruleForm,
                    resources: []
                };
            },
            selEquipmentType(e) {
                this.deviceTypeId = e;
                this.getAdvertisingSpaceType()
            },
            determine() {
                let childList = [];
                this.$refs.transfer.list.map((item) => {
                    if (item.checked) {
                        childList.push(item.id)
                    }
                    return item
                });
                this.addEquipment = false;
                this.ruleForm = {
                    ...this.ruleForm,
                    deviceIds: childList
                }

            },

            clickMaterial() {
                this.addSourceMaterial = true;
                this.type = this.ruleForm.type
            },

            /**
             * 选择素材
             */
            determineSelectMaterial() {
                let childList = [];
                this.$refs.selectMaterial.lists.map((item) => {
                    if (item.checked) {
                        childList.push(item.url)
                    }
                    return item
                });
                this.addSourceMaterial = false;
                this.ruleForm = {
                    ...this.ruleForm,
                    resources: childList
                };
            },

            clickVideoUrl(src, name) {
                this.detialPlayVideo = true;
                this.state = true;
                this.videoUrl = src;
                this.title = name
            },

            close() {
                this.state = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form {
        height: 100%;
        background: #fff;
        padding: 30px 30px 30px 0;
    }

    .selector {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0 20px 20px 20px;

        .selectedMaterial {
            padding-left: 50px;
            background: #f4f4f5;
            height: 30px;
            line-height: 30px;
        }

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

                    .bofang {
                        position: absolute;
                        top: 50px;
                        left: 68px;

                        .svg-icon {
                            font-size: 30px;
                            color: #fff;
                        }
                    }

                    .img {
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
