define([
  'jquery', 
  'underscore', 
  'backbone',
  'router',
  'bootstrap' // Request router.js
], function($, _, Backbone, Router,bootstrap){
  var initialize = function(){
	  $("#vertical-nav").affix();
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});