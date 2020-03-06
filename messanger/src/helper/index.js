export function formatDate(date) {
	const monthNames = ["Jan", "Feb", "March", "Apr", "May", "June",
	  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	
    let d = date ? new Date(date) : new Date(),
        month = '' + monthNames[d.getMonth()],
        day = '' + d.getDate(),
        year = d.getFullYear(),
		h = d.getHours(),
		m = d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return day + " " + month + "," + year + " " + h + ":" + m;
}
export function validURL(url) {
  var regExp = /(?:https?:\/\/(?:www\.)?)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/,
      match = url.match(regExp);

  return match ? match[3] : false;
}