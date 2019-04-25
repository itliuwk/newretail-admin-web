<template>
    <div class="form">
        <el-form
                :inline="true"
                :model="dataForm"
                class="demo-form-inline"
                label-width="120px"
                ref="form"
        >
            <div>
                <el-form-item label="分组名称"
                              prop="name"
                              :rules="[  { required: true, message: '不能为空'}, ]"
                >
                    <el-input
                            v-model="dataForm.name"
                            placeholder="分组名称"

                    ></el-input>
                </el-form-item>
            </div>
        </el-form>
    </div>
    <!--  <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >查询</el-button>
        </el-form-item> -->
</template>

<script>
    import {mapState, mapActions} from "vuex";

    export default {
        data() {
            return {
                dataForm: {
                    name: ""
                }
            };
        },
        mounted() {
        },
        computed: {},
        methods: {}

    };
</script>
<style lang="scss" scoped>
    .form {
        background: #fff;

        .demo-form-inline {
            width: 700px;
            margin: auto;
            padding-top: 60px;
            padding-bottom: 60px;

        }
    }
</style>

