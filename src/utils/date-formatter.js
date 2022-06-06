import moment from 'moment'

export const parseDailyData = (date) => {
    return moment(date).format('DD-MM-YYYY')
}

export const _parseDailyData = (date) => {
    return moment(date).format('DD-MM-YYYY')
}