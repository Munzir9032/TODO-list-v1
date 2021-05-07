function date() {
    let today = new Date();
    let date = today.getDay();
    let options = {
        weekday: "long",
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }

    day = today.toLocaleDateString('en-US', options)
    return day;
}
module.exports = date();