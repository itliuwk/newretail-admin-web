export default {
    search(form) {
        this.formdata = { ...this.formdata, ...form };
        this.getData();
    },
}