/* Run this as a daemon with `node_modules/forever/bin/forever start scheduler.js`
*/
var LightEvents = require('./lib/LightEvents');
var SunCalc = require('suncalc');
var CronJob = require('cron').CronJob;

// TODO: Get lat/lon from command line arguments
var location = {lat: 37.7833, lon:-122.4167}; // San Francisco

function getTimes(time){
	if (!time) time = new Date();
	// get today's sunlight times for location
	var times = SunCalc.getTimes(time, location.lat, location.lon);
	/*
	 nadir	- nadir (darkest moment of the night, sun is in the lowest position)
	 nightEnd	- night ends (morning astronomical twilight starts)
	 nauticalDawn	- nautical dawn (morning nautical twilight starts)
	 dawn	- dawn (morning nautical twilight ends, morning civil twilight starts)
	 sunrise	- sunrise (top edge of the sun appears on the horizon)
	 sunriseEnd	- sunrise ends (bottom edge of the sun touches the horizon)
	 goldenHourEnd	- morning golden hour (soft light, best time for photography) ends
	 solarNoon	- solar noon (sun is in the highest position)
	 goldenHour	- evening golden hour starts
	 sunsetStart	- sunset starts (bottom edge of the sun touches the horizon)
	 sunset	- sunset (sun disappears below the horizon, evening civil twilight starts)
	 dusk	- dusk (evening nautical twilight starts)
	 nauticalDusk	- nautical dusk (evening astronomical twilight starts)
	 night	- night starts (dark enough for astronomical observations)
	 */

	var timeArray=[];
	for (var k in times) {
		timeArray.push({event:k,time:times[k]});
	}
	timeArray.sort(function(a,b){return a.time - b.time});
	return timeArray;
}

function getNextEvents(){
	var times = getTimes();
	var now = new Date();
	var futureEvents = times.filter(function(t){
		return t.time>now;
	});
	if (futureEvents.length==0){
		var tomorrow = new Date(new Date(now).setDate(now.getDate()+1));
		futureEvents = getTimes(tomorrow);
	}
	return futureEvents;
}

function scheduleEvent(event){
	if (!event) event = getNextEvents()[0];
	if (!event.event || !event.time) throw new Error("Expected event with 'event' and 'date' properties.");
	var job = new CronJob({
		cronTime: event.time,
		onTick: function () {
			console.log(event.time + " - Firing event for " + event.event);
			var evtFunc = LightEvents[event.event]();
			if (typeof evtFunc == 'function') evtFunc();
			this.stop();
		},
		onComplete: function () {
			scheduleEvent(getNextEvents()[0]);
		},
		start: true
	});
	console.log(new Date()+" - Scheduled",event.event,"for",event.time);
}

// Hacky way to make sure it set lights for the correct time
var times = getTimes();
var now = new Date();
var lastEvent = times.filter(function(t){
	return t.time<now;
}).slice(-1)[0];
var now = new Date();
lastEvent.time = new Date(new Date(now).setSeconds(now.getSeconds()+1));
scheduleEvent(lastEvent);

// for testing, fire event foo for 1 second from now.
//var now = new Date();
//var then = new Date(new Date(now).setSeconds(now.getSeconds()+1));
//scheduleEvent({event:"nightEnd",time:then});
