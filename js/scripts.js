$(document).on('pageshow', '#home', function() {
	iconsPos();
}); 

$(document).bind("orientationchange", function(e){
	iconsPos(); 
});	


$(document).on('click', '#ul-news li', function() {
	showNews($(this));
}); 

$(document).on('click', '#button_back', function() {
	parent.history.back();
    return false;
}); 

$(document).on('click', '.lNews', function() {
	var a = $(this).attr("data-href");
	if(a == "news_f_i") {
		var URL = "http://www.varzesh3.com/files/leftnewsFootInt.asp";
		footballNewsList(URL,"news_f_i");
	} else if(a == "news_f_e") {
		var URL = "http://www.varzesh3.com/files/leftnewsFootExt.asp";
		footballNewsList(URL,"news_f_e");
		
	} else if(a == "news_s") {
		sportNewsList();
	}
	
}); 

$(document).on('click', '.aLeague', function() {
	showLeagueTable($(this));
}); 

