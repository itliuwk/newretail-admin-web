<template>
    <div class="replenishment">
        <div style="background: #fff;padding: 30px;">
            <MyForm @search="search" :cargo="true"></MyForm>
        </div>

        <div style="    margin-top: 20px;  padding: 30px;   background: #fff;">
            <MyTable :storex="{...$data}" @changePagination="changePaginationleft" @replenishment="changeReplenishment"></MyTable>
        </div>
    </div>
</template>

<script>
    import MyForm from "../status/form";
    import MyTable from "./table";
    import initStore from "./mixins/initStore.js";
    import tablemix from "./mixins/table.js";

    export default {
        name: "index",
        mixins: [initStore, tablemix],
        components: {
            MyForm,
            MyTable
        },
        methods: {}
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
