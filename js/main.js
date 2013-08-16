require.config({
	 shim: {
		    underscore: {
		      exports: '_'
		    },
		    backbone: {
		      deps: ['underscore', 'jquery'],
		      exports: 'Backbone'
		    },
		  	shBrushJScript:{
		  		deps:['shCore'],
		  		exports: 'shBrushJScript'
		  	},
		  	bootstrap:{
		  		deps:['jquery'],
		  		exports:'bootstrap'
		  	},
		  	d3:{
		  		exports:'d3'
		  	}
			   
		  },
  paths: {
    jquery: '../libs/jquery-1.9.1.min',
    underscore: '../libs/underscore-min',
    backbone: '../libs/backbone',
    templates: '../templates',
    d3: '../libs/d3.v3.min',
    shCore: '../libs/shCore',
    shBrushJScript: '../libs/shBrushJScript',
    bootstrap :'../libs/bootstrap'
  }

});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});