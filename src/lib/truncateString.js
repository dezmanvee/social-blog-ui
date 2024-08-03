//* Reduces string length to desired numbers of characters
const truncateString = (str, num) => {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + "..."
}

export default truncateString;