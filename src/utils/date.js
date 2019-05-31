import moment from 'moment'
export function getTimeForQiniu(date) {
    if (!date) {
        date = new Date()
    }
    if (typeof date != 'object') {
        date = new Date(date)
    }
    var a = moment(date).format('YYYY_MM_DD/HH_mm_ss_')
    return a
}
export function dateFormate(date) {
    if (!date) {
        date = new Date()
    }
    if (typeof date != 'object') {
        date = new Date(date)
    }
    var a = moment(date).format('YYYY-MM-DD')
    return a
}
export function getToday() {
    var date = new Date()
    var a = moment(date).format('YYYY-MM-DD')
    var b = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
    return {
        start: a,
        end: a,
        laststart: b,
        lastend: b,
        siez:10
    }
}
export function getLastWeek() {
    return {
        start: moment().startOf('isoWeek').format('YYYY-MM-DD'),
        end: moment().endOf('isoWeek').format('YYYY-MM-DD'),
        laststart: moment().add(-1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),
        lastend: moment().add(-1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),
        siez:10
    }
}

export function getLastMonth() {
    return {
        start: moment().startOf('months').format('YYYY-MM-DD'),
        end: moment().endOf('months').format('YYYY-MM-DD'),
        laststart: moment().add(-1, 'months').startOf('isoWeek').format('YYYY-MM-DD'),
        lastend: moment().add(-1, 'months').startOf('isoWeek').format('YYYY-MM-DD'),
        siez:10
    }
}
