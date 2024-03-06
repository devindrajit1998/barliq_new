export function formatDate(date) {
  let data = date.split("T");
  return data[0] + "T00:00:00.000Z";
}
