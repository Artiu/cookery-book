export const convertTimestampToDateString = (timestamp) => {
    const date = timestamp.toDate();
    const formatValue = (value) => {
        return String(value).length === 1 ? "0" + value : value;
    };
    return `${formatValue(date.getHours())}:${formatValue(date.getMinutes())} ${formatValue(
        date.getDate()
    )}.${formatValue(date.getMonth() + 1)}.${date.getFullYear()}`;
};
