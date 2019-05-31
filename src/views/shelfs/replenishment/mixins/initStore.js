import { pageSize } from "@/config";

export default {
    data() {
        return {
            dataForm: {
                query: "", active: "", deviceTypeId: "",
                size: pageSize, from: 0
            },
            isEdit: false,
            isPostSelf: false,
            cacheRow: {},
            loading: false,
            leftTableData: [],
            devices: 0,
            outOfStockDevices: 0,
            leftSelectRow: {},
        }
    }
}
