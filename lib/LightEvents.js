
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
		ctrl.darkest(1,function(){
			ctrl.warmest(1);
		});
		ctrl.darkest(4,function(){
			ctrl.warmest(4);
		});
	},
	// nautical dawn (morning nautical twilight starts)
	nauticalDawn: function(){
		ctrl.brighter(1);
		ctrl.brighter(4);
	},
	// dawn (morning nautical twilight ends, morning civil twilight starts)
	dawn: function(){
		ctrl.brighter(1);
		ctrl.brighter(1);
		ctrl.brighter(4);
		ctrl.brighter(4);
	},
	// sunrise (top edge of the sun appears on the horizon)
	sunrise: function(){
		ctrl.brighter(1,function(){
			ctrl.setWarmness(80,1);
		});
		ctrl.brighter(4,function(){
			ctrl.setWarmness(80,4);
		});
	}, 
	// sunrise ends (bottom edge of the sun touches the horizon)
	sunriseEnd: function(){
		ctrl.brighter(1,function(){
			ctrl.setWarmness(60,1);
		});
		ctrl.brighter(4,function(){
			ctrl.setWarmness(60,4);
		});
	},
	// morning golden hour (soft light, best time for photography) ends
	goldenHourEnd: function(){
		ctrl.setBrightness(80,1,function(){
			ctrl.setCoolness(60,1);
		});
		ctrl.setBrightness(80,4,function(){
			ctrl.setCoolness(60,4);
		});
	},
	// solar noon (sun is in the highest position)
	solarNoon: function(){
		ctrl.onFull(1,function(){
			ctrl.setCoolness(100,1);
		});
		ctrl.onFull(4,function(){
			ctrl.setCoolness(100,4);
		});
	},
	// evening golden hour starts
	goldenHour:function(){
		ctrl.setBrightness(80,1,function(){
			ctrl.setCoolness(60,1);
		});
		ctrl.setBrightness(80,4,function(){
			ctrl.setCoolness(60,1);
		});
	},
	// sunset starts (bottom edge of the sun touches the horizon)
	sunsetStart: function(){
		ctrl.dimmer(1,function(){
			ctrl.setWarmness(60,1);
		});
		ctrl.dimmer(4,function(){
			ctrl.setWarmness(60,4);
		});
	},
	// sunset (sun disappears below the horizon, evening civil twilight starts)
	sunset: function(){
		ctrl.dimmer(1,function(){
			ctrl.setWarmness(80,1);
			ctrl.dimmer(1);
		});
		ctrl.dimmer(4,function(){
			ctrl.setWarmness(80,4);
			ctrl.dimmer(4);
		});
	},
	// dusk (evening nautical twilight starts)
	dusk: function(){
		ctrl.dimmer(1,function(){
			ctrl.warmest(1);
			ctrl.dimmer(1);
		});
		ctrl.dimmer(4,function(){
			ctrl.warmest(4);
			ctrl.dimmer(4);
		});
	},
	// nautical dusk (evening astronomical twilight starts)
	nauticalDusk: function(){
		ctrl.dimmer(1,function(){
			ctrl.warmest(1);
			ctrl.dimmer(1);
		});
		ctrl.dimmer(4,function(){
			ctrl.warmest(4);
			ctrl.dimmer(4);
		});
	}, 
	// night starts (dark enough for astronomical observations)
	night: function(){
		//ctrl.nightlight(1);
		ctrl.darkest(1,function(){
			ctrl.warmest(1);
		});
		ctrl.darkest(4,function(){
			ctrl.warmest(4);
		});
	} 
};
