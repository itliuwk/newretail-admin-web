// elementui 版本的 myalert
const myalert = {}
myalert.success = function (msg) {
    window._vm.$message({
        message: msg,
        type: 'success'
    });
}
myalert.fail = function (msg) {
    window._vm.$message.error(msg);
}
myalert.confirm = function (msg) {
    return window._vm.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
}
//带有输入的提示
//options seemore http://element.eleme.io/#/zh-CN/component/message-box
myalert.prompt = function (msg, options) {
    return window._vm.$prompt(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: options.inputPattern,
        inputValidator: options.inputValidator,
        inputValue: options.inputValue,
        inputErrorMessage: options.inputErrorMessage || '格式不正确'
    })
}
export default myalert
