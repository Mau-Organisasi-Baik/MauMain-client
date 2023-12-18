export const GetUtcHours = (time) => {
    console.log(time, 'time');
    const parts = time.split(':')
    const hours = parts[0].substring(1)
    const minutes = parts[1]
    return `${hours}.${minutes}`
}