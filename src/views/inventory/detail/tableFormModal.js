import { pageSize } from "@/config";

var tableFormTable = {
    "from": 0,
    "size": pageSize,
    "productId": "",
    "locationId": "",
    "type": "",
    "start": "",
    "end": "",
    time: [],
}
Object.defineProperties(tableFormTable, {
    time: {},
    "start": {
        get() {
            if (!this.time) return ""
            return new Date(this.time[0]).getTime()
        },
    },
    "end": {
        get() {
            if (!this.time) return ""
            return new Date(this.time[1]).getTime()
        },
    },

})
export default tableFormTable