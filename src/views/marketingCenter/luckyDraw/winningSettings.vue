<template>
    <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="奖项名称" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="奖品" prop="itemId" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
            <el-radio-group v-model="form.type" @change="radioChange">
                <el-radio label="COUPON">
                    <span style="margin-right: 10px;">优惠券</span>
                    <el-select :disabled="!isCoupons" style="width: 144px" @change="couponsChange" v-model="form.coupon"
                               placeholder="选择优惠券">
                        <el-option v-for="item in coupons" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-radio>
                <el-radio label="CARD">
                    <span style="margin-right: 10px;">会员卡</span>
                    <el-select :disabled="isCoupons" style="width: 144px" @change="cardChange" v-model="form.card"
                               placeholder="选择会员卡">
                        <el-option v-for="item in card" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="奖项数量" prop="stock" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
            <el-input v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item label="中奖概率%" prop="probability" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
            <el-input v-model="form.probability"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    import {GET_VIPVARDS, GET_COUPONS} from '@/api/common'

    export default {
        data() {
            return {
                coupons: [],
                card: [],
                isCoupons: true,
                form: {
                    name: '',
                    coupon: '',
                    card: '',
                    stock: '',
                    itemId: '',
                    type: 'COUPON',
                    probability: ''
                }
            }
        },
        props: {
            row: Object
        },
        created() {
            let rows = JSON.parse(JSON.stringify(this.row));
            this.initFun().then(res => {
                if (rows.type == "COUPON") {
                    rows.coupon = rows.itemId;
                    this.isCoupons = true;
                } else {
                    rows.card = rows.itemId;
                    this.isCoupons = false;
                }
                this.form = rows;
            })
        },
        methods: {
            async initFun() {
                await GET_COUPONS().then(res => {
                    this.coupons = res;
                });
                await GET_VIPVARDS().then(res => {
                    this.card = res;
                });
            },
            radioChange(val) {
                if (val == 'COUPON') {
                    this.isCoupons = !this.isCoupons
                } else {
                    this.isCoupons = !this.isCoupons
                }
            },
            couponsChange(val) {
                this.form = {
                    ...this.form,
                    coupon: val,
                    card: '',
                    itemId: val
                };
            },
            cardChange(val) {
                this.form = {
                    ...this.form,
                    coupon: '',
                    card: val,
                    itemId: val
                }
            },
        },
        watch: {
            row() {
                let rows = JSON.parse(JSON.stringify(this.row));

                if (rows.type == "COUPON") {
                    rows.coupon = rows.itemId;
                    this.isCoupons = true;
                } else {
                    rows.card = rows.itemId;
                    this.isCoupons = false;
                }
                this.form = rows;
            }
        }
    }
</script>
