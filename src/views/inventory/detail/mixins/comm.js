import { mapActions, mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            deviceTypes: state => state.common.deviceTypes,
            roles: state => state.common.roles,
            locations: state => state.common.locations,
            deviceGroups: state => state.common.deviceGroups,
            locationTypes: state => state.common.locationTypes,
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