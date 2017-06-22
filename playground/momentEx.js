const moment = require('moment');

console.log(moment().format());

var now = moment();
console.log('now:', now.unix());

var timestamp = 1459111648;
var currMoment = moment.unix(timestamp);

console.log('currMoment:(MMM D, YY @ h:mm a)', currMoment.format('MMM D, YY @ h:mm a'));

console.log('currMoment:(MMMM do, YYYY @ hh:mm A)', currMoment.format('MMMM Do, YYYY @ hh:mm A'));
