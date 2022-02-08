export function transformDateString(string: string) {

    var dateParts = string.split(".");

    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObject = new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0]);

    return formatDate(dateObject);

}

export function formatDate(date: Date) {
    var d = date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    const result = [year, month, day].join('-');
    console.log(result);
    return result;
}