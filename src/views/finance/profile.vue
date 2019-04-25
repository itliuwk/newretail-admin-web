<template>
    <div class="profile">
        <div class="item">
            <div class="small">账户余额</div>
            <div class="strong">{{moneyNum.balance}}元</div>
        </div>
        <div class="item">
            <div class="small">收入</div>
            <div class="strong">{{moneyNum.income}}元</div>
        </div>
        <div class="item">
            <div class="small">支出</div>
            <div class="strong">{{moneyNum.cashWithdrawal}}元</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["moneyNum"]
    };
</script>
<style lang="scss" scoped>
    .profile {
        background: #fff;
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #ddd;
        padding: 40px;

        .item {
            width: 100%;
            text-align: center;
            border-right: 1px solid #ddd;

            .small {
            }

            .strong {
                margin-top: 10px;
                font-size: 20px;
                font-weight: bold;
            }

            &:last-child {
                border-right: none;
            }
        }
    }
</style>
