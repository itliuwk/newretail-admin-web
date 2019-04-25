<template>
    <div class="editModal">
        <el-form
                :inline="true"
                :model="dataForm_copy"
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
                            v-model="dataForm_copy.name"
                            placeholder="分组名称"

                    ></el-input>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        props: {
            dataForm: {
                type: Object
            }
        },
        data() {
            return {}
        },
        destroyed() {

        },
        computed: {
            ...mapState('device/group/edit', {}),
            dataForm_copy() {
                return JSON.parse(JSON.stringify(this.dataForm))
            }
        }
    }
</script>