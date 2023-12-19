export const GetUtcHours = (time) => {
    const parts = time.split(':')
    const hours = parts[0].substring(1)
    const minutes = parts[1]
    return `${hours}.${minutes}`
}

export const FormatHourAndMinute = (rawDate) => {
const date = new Date(rawDate)
const hours = date.getHours();
const minutes = date.getMinutes();

// Memformat jam dan menit ke format "HH:MM"
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
return formattedTime
}