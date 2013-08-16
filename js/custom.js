jQuery.defaultSideMenu = function(tabno){
	$("nav#vertical-nav .nav ul li").removeClass("active");
	$("nav#vertical-nav .nav ul li i").removeClass("icon-white");
	$('nav#vertical-nav .nav li:nth-child('+tabno+')').addClass("active");
	$('nav#vertical-nav .nav li:nth-child('+tabno+') i').addClass("icon-white");

};

jQuery.defaultHorizontalNav = function(tabno){
	$("nav#horizontal-nav ul.nav  li").removeClass("active");
	$('nav#horizontal-nav ul.nav li:nth-child('+tabno+')').addClass("active");
};