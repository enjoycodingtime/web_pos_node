function Time() {

};
Time.prototype.get_time = function() {
	
	var	dateDigitToString = function (num) {
            return num < 10 ? '0' + num : num;
        };
    var currentDate = new Date(),
		year = dateDigitToString(currentDate.getFullYear()),
		month = dateDigitToString(currentDate.getMonth() + 1),
		date = dateDigitToString(currentDate.getDate()),

		formattedDateString = year + '-' + month + '-' + date;
		return formattedDateString;
};

module.exports = Time;