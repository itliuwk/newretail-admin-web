import { mapActions, mapState } from 'vuex'
export default {
    computed: {
        ...mapState("inventory/list", {
            list_editRow: state => state.editRow
        }),
        ...mapState({
            deviceTypes: state => state.common.deviceTypes,
            roles: state => state.common.roles,
            locations: state => state.common.locations,
            deviceGroups: state => state.common.deviceGroups,
            locationTypes: state => state.common.locationTypes,
        }),
        ...mapState("inventory/detail", {
            editRow: state => state.editRow,
            lists: state => state.lists,
            loading: state => state.loading,
            "form": state => state.form,
            "total": state => state.total,
            tablelist1: state => state.tablelist1,
            stockshow: state => state.stockshow,
            editRow2: state => state.editRow2,
            transfershow: state => state.transfershow,
            returnshow: state => state.returnshow,
        }),
    },
    methods: {
        ...mapActions([
            "getDeviceGroups",
            "getRoles",
            "getLocations",
            "getDeviceTypes",
            "getLocationTypes"
        ]),
        ...mapActions("inventory/detail",
            [
                "setEditRow",
                "search",
                "getLists",
                "setStore"
            ])
    },
    mounted() {
        if (!this.deviceTypes.length) {
            this.getDeviceGroups()
        }
        if (!this.roles.length) {
            this.getRoles()
        }
        if (!this.locations.length) {
            this.getLocations()
        }
        if (!this.deviceGroups.length) {
            this.getDeviceTypes()
        }
        if (!this.locationTypes.length) {
            this.getLocationTypes()
        }

    },
}