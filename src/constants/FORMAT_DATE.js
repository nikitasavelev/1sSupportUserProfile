export default function formatDate(UTCDate) {
    const date = new Date(UTCDate);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}
