const getFormattedTime = epochTime => {
    const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(epochTime);
    let hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    const am_pm = d.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    const minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    return  hours + ":" + minutes + ":" + seconds + " " + am_pm;
};

module.exports = {
    getFormattedTime
};
