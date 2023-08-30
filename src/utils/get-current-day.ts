export function getCurrentDate (offect: number = 0): Date {
  const currentDatetime = new Date()
  return new Date(Date.UTC(
    currentDatetime.getUTCFullYear(),
    currentDatetime.getUTCMonth(),
    currentDatetime.getUTCDate() + offect
  ))
}
