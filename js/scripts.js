$(document).on('pageshow', '#home', function() {
	iconsPos();
}); 

$(document).bind("orientationchange", function(e){
	iconsPos(); 
});	


$(document).on('pageinit', '#news_f_i', function() {
	var URL = "http://www.varzesh3.com/files/leftnewsFootInt.asp";
	footballNewsList(URL,"news_f_i");
}); 

$(document).on('pageinit', '#news_f_e', function() {
	var URL = "http://www.varzesh3.com/files/leftnewsFootExt.asp";
	footballNewsList(URL,"news_f_e");
}); 

$(document).on('pageinit', '#news_s', function() {
	sportNewsList();
}); 


$(document).on('click', '#ul-news li', function() {
	$.mobile.loadingMessage = "please wait...";
	$.mobile.showPageLoadingMsg();
	showNews($(this));
}); 

$(document).on('click', '#button_back', function() {
	parent.history.back();
    return false;
}); 

$(document).on('click', '.aLeague', function() {
	showLeagueTable($(this));
}); 

