// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/all-sort'],
   function(
    $,
    _,
    Backbone,
    bootstrap,
    AllSortView) {
  
  var AppRouter = Backbone.Router.extend({
	  routes: {
	      // Define some URL routes
          '':'allSort',
          ':sortType':'allSort'
	    		
	  }
  });
  
  var initialize = function(){
		
    var app_router = new AppRouter;	
    var bottomUpMS;
    var allSortView;
   
    //define home route 
   app_router.on('route:allSort', function (sortType) {
        if(!allSortView){

          allSortView = new AllSortView();
        }
        allSortView.render({sortType:sortType});

    });
   
   
    
   
     
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
