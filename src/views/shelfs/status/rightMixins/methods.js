import { get_shelfs_device_detail, put_shelfs_device_detail } from '../../../../api/devicesStatus';
import map from 'lodash.map'
import myalert from '../../../../utils/alert';
export default {
    methods: {
        async init() {
            var id = this.leftSelectRow.id; //编辑的id
            this.right_loading = true;
            var detail = await get_shelfs_device_detail(id).then(res => {
                res.shelfs = map(res.shelfs, item => {
                    return { ...item, isEdit: false };
                });
                return res;
            });
            this.right_detail = detail;
            this.right_loading = false;
        },
        pilian1() {
            if (this.$data.right_editItem.length <= 0) {
                myalert.fail("请选择先");
                return false;
            }
            this.$data.right_editModalState = true;
        },
        tijiao() {
            var self = this;
            var data = {
                "deviceId": this.leftSelectRow.id,
                shelfCount: this.right_detail.shelfs.length,
                shelfs: this.right_detail.shelfs
            };
            var isOkPost = true;
            map(data.shelfs, item => {
                if (!item.productId) {
                    isOkPost = false;
                }
            });
            if (!isOkPost) {
                return false;
            }
            put_shelfs_device_detail(data).then(res => {
                self.init().then(res => {
                    myalert.success("保存成功");
                });
            });
        },
        shelfCountChange(value) {
            if (value > this.right_detail.shelfs.length) {
                for (var i = 0; i < value - this.right_detail.shelfs.length; i++) {
                    this.right_detail.shelfs.push({
                        checked: false,
                        number: this.right_detail.shelfs.length + 1,
                        image: "",
                        productId: "",
                        safeStock: "",
                        price: 0,
                        maxStock: "",
                        name: ""
                    })
                }
            }
            if (value < this.right_detail.shelfs.length) {
                this.right_detail.shelfs = this.right_detail.shelfs.slice(0, value);
            }

            this.right_detail.shelfCount = value
        },
        selectItem(item) {
            this.right_editItem = [item];
        },
        deleteItem(item) {
            var _index = this.right_detail.shelfs.findIndex(_item => item.id == _item.id);
            this.right_detail.shelfs.splice(_index, 1);
        },
        finishEdit(formData) {
            var self = this;
            var shelfs = this.right_detail.shelfs;
            shelfs.map((item, index) => {
                self.right_editItem.map((item2, index2) => {
                    if (item2.number == item.number) {
                        if (self.right_editItem.length <= 1) {
                            item.number = formData.number;
                        }
                        item.price = formData.price;
                        item.image = formData.image;
                        item.name = formData.name;
                        item.productId = formData.productId;
                        item.safeStock = formData.safeStock;
                        item.maxStock = formData.maxStock;
                    }
                });
            });
            //取消选择
            this.right_editItem = [];
        }
    }
}