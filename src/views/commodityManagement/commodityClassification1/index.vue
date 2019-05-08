<template>
    <div>
        <form-container label="分类名称" @submit="submitForm" @resetForm="resetForm"></form-container>
        <classification :params="params" @currId="currId" @products="products" :success="refresh"></classification>
        <classification-list :classifyId="classifyId" :productsCount="productsCount" @$success="refreshList"></classification-list>
    </div>
</template>

<script>

    const FormContainer = () => import('../form.vue');
    const Classification = () => import('./classification.vue');
    const ClassificationList = () => import('./classificationList.vue');
    export default {
        name: "commodityClassification1",
        data() {
            return {
                refresh: 0,
                classifyId: '',
                productsCount: '',
                list: [],
                params: {
                    query: ''
                }
            }
        },
        components: {
            FormContainer,
            Classification,
            ClassificationList
        },
        methods: {
            /**
             * 查询
             */
            submitForm(res) {
                this.params = {
                    query: res.name
                };
                this.$emit('submit', this.params)
            },

            /**
             * 重置
             */
            resetForm() {
                this.params = {
                    query: ''
                };
            },

            currId(res) {
                this.classifyId = res;
            },
            products(res) {
                this.productsCount = res;
            },
            refreshList() {

                this.refresh = this.refresh + 1;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
