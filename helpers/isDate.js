const moment = require('moment');

const isDate = (value) => {
    if (!value) {
        return false;
    }

    const eventDate = moment(value);
    if (eventDate.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isDate
};