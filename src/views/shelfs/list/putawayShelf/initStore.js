import { pageSize } from '../../../../config';
export default {
    selectData: [],
    formdata: {
        from: 0,
        size: pageSize
    },
    tableLoading: false,
    leftTableList: [],
    leftTableSelect: [],
    activeDevices: 0,
    devices: 0,
    rightTableSelect: [],
    clickwhat: "",//目前在点击那个界面 clickleft, clickright
}