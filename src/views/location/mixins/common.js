import { mapState, mapActions } from "vuex";

export default {
    mounted() {
        this.getDeviceTypes();
        this.getLocations();
        this.getDeviceGroups();
    },
    computed: {
        ...mapState({
            deviceTypes: state => state.common.deviceTypes,
            locations: state => state.common.locations,
            deviceGroups: state => state.common.deviceGroups
        })
    },
    methods: {
        ...mapActions([
            "getDeviceTypes",
            "getLocations",
            "getDeviceGroups",
            "delVisitedView"
        ]),
    }
}
