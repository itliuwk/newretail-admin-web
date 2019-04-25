
import Vue from 'vue'
export function getWinWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}
export function getWinHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

export function getMainContainerWidth() {
    return getWinWidth() - 80
}
export function getMainContainerHeight() {
    return getWinHeight() - 80
}


/**
 * 获取屏幕宽高
 */
Vue.prototype.getViewportSize = function () {
    return {
        width: getWinWidth(),
        height: getWinHeight(),
        mainHeight: getMainContainerHeight()
    }
};
