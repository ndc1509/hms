
export const addHours = (date, h) => {
    return new Date(date.getTime() + h * 60 * 60 * 1000)
}

export const dateDistance = (startDate, endDate) => {
    const dist = Date.parse(endDate.split('T')[0]) - Date.parse(startDate.split('T')[0])
    if(dist === 0)
        return 0
    return dist / (24 * 60 * 60 * 1000)
}

export const dateForrmatter = (dateString) => {
    const dateTime = new Date(Date.parse(dateString))
    const date = dateTime.toISOString().split('T')[0]
    const year = date.split('-')[0]
    const month = date.split('-')[1]
    const day = date.split('-')[2]
    return `${day}/${month}/${year}`
}