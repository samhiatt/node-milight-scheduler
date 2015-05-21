
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

var ctrl = require('node-milight')({host:'192.168.42.100',delay:100}).WhiteController;


exports = module.exports = {
	// night ends (morning astronomical twilight starts)
	nightEnd: function(){
		ctrl.darkest(0,function(){
			ctrl.warmest(0);
		});
	},
	// nautical dawn (morning nautical twilight starts)
	nauticalDawn: function(){
		ctrl.brighter(0);
	},
	// dawn (morning nautical twilight ends, morning civil twilight starts)
	dawn: function(){
		ctrl.brighter(0);
		ctrl.brighter(0);
	},
	// sunrise (top edge of the sun appears on the horizon)
	sunrise: function(){
		ctrl.brighter(0,function(){
			ctrl.setWarmness(80);
		});
	}, 
	// sunrise ends (bottom edge of the sun touches the horizon)
	sunriseEnd: function(){
		ctrl.brighter(0,function(){
			ctrl.setWarmness(60);
		});
	},
	// morning golden hour (soft light, best time for photography) ends
	goldenHourEnd: function(){
		ctrl.setBrightness(80,0,function(){
			ctrl.setCoolness(60);
		});
	},
	// solar noon (sun is in the highest position)
	solarNoon: function(){
		ctrl.onFull(0,function(){
			ctrl.setCoolness(100);
		});
	},
	// evening golden hour starts
	goldenHour:function(){
		ctrl.setBrightness(80,0,function(){
			ctrl.setCoolness(60);
		});
	},
	// sunset starts (bottom edge of the sun touches the horizon)
	sunsetStart: function(){
		ctrl.dimmer(0,function(){
			ctrl.setWarmness(60);
		});
	},
	// sunset (sun disappears below the horizon, evening civil twilight starts)
	sunset: function(){
		ctrl.dimmer(0,function(){
			ctrl.setWarmness(80);
			ctrl.dimmer(0);
		});
	},
	// dusk (evening nautical twilight starts)
	dusk: function(){
		ctrl.dimmer(0,function(){
			ctrl.warmest(0);
			ctrl.dimmer(0);
		});
	},
	// nautical dusk (evening astronomical twilight starts)
	nauticalDusk: function(){
		ctrl.dimmer(0,function(){
			ctrl.warmest(0);
			ctrl.dimmer(0);
		});
	}, 
	// night starts (dark enough for astronomical observations)
	night: function(){
		//ctrl.nightlight(1);
		ctrl.darkest(0,function(){
			ctrl.warmest(0);
		});
	} 
};