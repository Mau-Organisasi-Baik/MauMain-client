export function getScheduleTime(time) {
  const regexPattern = /T(\d{2}:\d{2})\:\d{2}\.\d{3}Z/;
  const match = time.match(regexPattern);

  return match[1]
}