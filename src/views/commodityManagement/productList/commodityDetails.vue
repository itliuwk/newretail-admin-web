<template>
    <div class="form">
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="成本价" prop="costPrice" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input type="number" v-model="ruleForm.costPrice"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input type="number" v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="equipmentType">
                <el-select v-model="ruleForm.categoryId" placeholder="商品分类">
                    <el-option v-for="item in equipmentType" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品图" prop="image" :rules="[{required: true, message: '不能为空'}]">

                <a v-show="!ruleForm.image" href="javascript:;" class="file">+
                    <p class="info">( 建议尺寸：354(高)*288(宽)像素 )</p>
                    <input type="file" @change="uploadImg($event,'image')"
                           accept="image/jpg,image/jpeg,image/png" name="">
                </a>
                <a v-show="ruleForm.image" href="javascript:;" class="file image">
                    <img :src="ruleForm.image" alt="">
                    <input type="file" @change="uploadImg($event,'image')"
                           accept="image/jpg,image/jpeg,image/png" name="">
                </a>
            </el-form-item>

            <el-form-item label="商品展示图" prop="displayImage" :rules="[{required: true, message: '不能为空'}]">

                <a v-show="!ruleForm.displayImage" href="javascript:;" class="file">+
                    <p class="info">( 建议尺寸：400(高)*750(宽)像素 )</p>
                    <input type="file" @change="uploadImg($event,'displayImage')"
                           accept="image/jpg,image/jpeg,image/png" name="">
                </a>
                <a v-show="ruleForm.displayImage" href="javascript:;" class="file image">
                    <img :src="ruleForm.displayImage" alt="">
                    <input type="file" @change="uploadImg($event,'displayImage')"
                           accept="image/jpg,image/jpeg,image/png" name="">
                </a>
            </el-form-item>


            <el-form-item label="商品详情图" prop="detailImage" :rules="[{required: true, message: '不能为空'}]">
                <a v-show="!ruleForm.detailImage" href="javascript:;" class="file">+
                    <p class="info">( 建议尺寸：高(不限)*750(宽)像素 )</p>
                    <input type="file" @change="uploadImg($event,'detailImage')"
                           accept="image/jpg,image/jpeg,image/png" name="">
                </a>
                <a v-show="ruleForm.detailImage" href="javascript:;" class="file image">
                    <img :src="ruleForm.detailImage" alt="">
                    <input type="file" @change="uploadImg($event,'detailImage')"
                           accept="image/jpg,image/jpeg,image/png" name="">
                </a>
            </el-form-item>

            <el-form-item label="商品描述">
                <el-input type="textarea" class="textarea" v-model="ruleForm.description"></el-input>
            </el-form-item>

        </el-form>


    </div>
</template>
<script>
    import {DETAIL_ITEM, GET_LIST_CATEGORIES} from '@/api/commodityManagement'
    import Alert from "@/utils/alert";
    import upload from "@/utils/upload";

    export default {
        data() {
            return {
                ruleForm: {
                    id: '',
                    name: '',
                    price: '',
                    costPrice: '',
                    categoryId: '',
                    image: '',
                    displayImage: '',
                    detailImage: '',
                    description: ''
                },
                equipmentType: []
            };
        },
        props: ['currId'],
        computed: {
            id() {
                return this.currId
            }
        },
        mounted() {
            this.GET_LIST_CATEGORIES();
            if (this.id) {
                this.getDetailItem();
                this.ruleForm = {
                    ...this.ruleForm,
                    id: this.id
                }
            }


        },
        methods: {
            /**
             * 获取商品详情
             */
            getDetailItem() {
                let params = {
                    id: this.id
                };
                DETAIL_ITEM(params).then(res => {
                    this.ruleForm = res;
                    this.GET_LIST_CATEGORIES();
                })
            },

            GET_LIST_CATEGORIES() {
                console.log(this.ruleForm);
                GET_LIST_CATEGORIES().then(res => {
                    this.equipmentType = res
                })
            },

            /**
             *  调用七牛云上传图片
             */
            uploadImg(e, curr) {
                let files = e.target.files[0];
                upload(files).then(res => {
                    let src = res.path;
                    if (curr == 'image') {
                        this.ruleForm = {
                            ...this.ruleForm,
                            image: src
                        }
                    } else if (curr == 'displayImage') {
                        this.ruleForm = {
                            ...this.ruleForm,
                            displayImage: src
                        }
                    } else {
                        this.ruleForm = {
                            ...this.ruleForm,
                            detailImage: src
                        }
                    }
                });
            },

            // /**
            //  * 删除重新上传
            //  */
            // removeSelImg(curr) {
            //     if (curr == 'image') {
            //         this.ruleForm = {
            //             ...this.ruleForm,
            //             image: ''
            //         };
            //     } else if (curr == 'displayImage') {
            //         this.ruleForm = {
            //             ...this.ruleForm,
            //             displayImage: ''
            //         };
            //     } else {
            //         this.ruleForm = {
            //             ...this.ruleForm,
            //             detailImage: ''
            //         };
            //     }
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .form {
        height: 100%;
        background: #fff;
        padding: 30px 30px 30px 0;
    }

    .file {
        position: relative;
        top: 0;
        display: inline-block;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        width: 110px;
        height: 140px;
        text-align: center;
        line-height: 85px;
        font-size: 40px;

        input {
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }
    }

    .image {
        width: 110px;
        height: 140px;
        position: relative;

        img {
            width: 100%;
            height: 100%;
        }

        i {
            position: absolute;
            top: -6px;
            right: -6px;
            display: inline-block;
            width: 15px;
            height: 15px;
            line-height: 15px;
            text-align: center;
            background: red;
            border-radius: 50%;
            color: #fff;
            cursor: pointer;
        }
    }

    .el-textarea {
        width: 400px;
        height: 80px;
        resize: none;

        &.el-textarea__inner {
            resize: none;
        }
    }

    .el-form-item__content {
        position: relative;

        .info {
            position: absolute;
            font-size: 12px;
            top: 48px;
            color: #ccc;
            line-height: normal;
        }
    }

</style>
