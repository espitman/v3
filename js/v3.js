function footballNewsList(URL, elm) {
	$.ajax({
		type : "POST",
		url : "http://boum.ir/test/proxy.php",
		dataType : "html",
		data : {
			url : URL
		},
		async : true,
		success : function(data) {
			$("#" + elm + " #ul-news").empty();
			var data = $("<div>" + data + "</div>");
			$(data).find(".inbndata ul li a").each(function() {
				var title = $(this).text();
				var link = $(this).attr("href");
				$("#" + elm + " #ul-news").append("<li data-title='" + title + "' data-link='" + link + "' style='direction:rtl;text-align:right;' href='#anews'>" + title + "</li>");
				$("#" + elm + " #ul-news").listview("refresh");
			});
		},
		error : function(data) {
		}
	});
}

//--------------------------------------------------------
function sportNewsList() {
	var URL = "http://www.varzesh3.com/";
	var elm = "news_s";
	$.ajax({
		type : "POST",
		url : "http://boum.ir/test/proxy.php",
		dataType : "html",
		data : {
			url : URL
		},
		async : true,
		success : function(data) {
			var data = $("<div>" + data + "</div>");
			var data = $(data).find("#identifierwidget-302 .widget-content").html();
			var data = $("<div>" + data + "</div>");
			$(data).find(".inbndata ul li").each(function() {
				var title = $(this).text();
				var link = $(this).attr("href");
				$("#" + elm + " #ul-news").append("<li data-title='" + title + "' data-link='" + link + "' style='direction:rtl;text-align:right;'>" + title + "</li>");
				$("#" + elm + " #ul-news").listview("refresh");
			});
		},
		error : function(data) {
		}
	});
}

//--------------------------------------------------------
function showNews(a) {
	$("#anews div[data-role='content']").empty();
	$("#anews h1").empty();
	var title = a.attr("data-title");
	var link = a.attr("data-link");
	$("#anews h1").html(title);
	
	$.mobile.showPageLoadingMsg();
	var anews = localStorage.getItem('allNews_' + link);
	if (anews) {
		anews = JSON.parse(anews);
		drawNews(anews);
	} else {
		$.ajax({
			type : "POST",
			url : "http://boum.ir/test/proxy.php",
			dataType : "html",
			data : {
				url : link
			},
			async : true,
			success : function(data) {
				var anews = JSON.stringify(data);
				localStorage.setItem('allNews_' + link, anews);
				drawNews(data);
			},
			error : function(data) {
			}
		});
	}
}

//--------------------------------------------------------
function drawNews(data) {
	var data = $("<div>" + data + "</div>");
	var img = $(data).find("#CenterTable table#NewsTable img").attr("src");
	var lead = $(data).find("#CenterTable table#NewsTable h2").text();
	var text = $(data).find("#CenterTable table:nth-child(2) tr:nth-child(2) td").html();
	$("#anews div[data-role='content']").html("<div id='news_row'></div>")
	$("#anews div[data-role='content'] #news_row").html("<div id='news_img'><img src='" + img + "' /></div>");
	$("#anews div[data-role='content'] #news_row").append("<div id='news_lead'>" + lead + "</div>");
	$("#anews div[data-role='content']").append("<div id='news_text'>" + text + "</div>");
    $.mobile.changePage($("#anews"), {transition: "slide"});
	$.mobile.hidePageLoadingMsg();
}

//--------------------------------------------------------
function showLeague(a) {
	var link = a.attr("data-link");
	var anews = localStorage.getItem('league_' + link);
	if (anews) {
		anews = JSON.parse(anews);
		drawLeague(anews, a);
	} else {
		$.ajax({
			type : "POST",
			url : "http://boum.ir/test/proxy.php",
			dataType : "html",
			data : {
				url : link
			},
			async : true,
			success : function(data) {
				var anews = JSON.stringify(data);
				localStorage.setItem('league_' + link, anews);
				drawLeague(data, a);
			},
			error : function(data) {
			}
		});
	}
}

//--------------------------------------------------------
function drawLeague(data, a) {
	$("#league #anc-op").show();
	var data = $("<div>" + data + "</div>");
	var wTitle = data.find("ul:nth-child(1) li").html();
	var wDate = data.find("ul:nth-child(2) li").html();
	data.find("ul:nth-child(1)").remove();
	data.find("ul:nth-child(1)").remove();
	$("#league div[data-role='content']").append("<h1>" + wTitle + "</h1>");
	//$("#league div[data-role='content']").append("<h2>"+wDate+"</h2>");
	$("#league div[data-role='content']").append(data.find(".league-table"));
}

//--------------------------------------------------------
function showLeagueTable(a) {
	$("#league h1").empty();
	$("#league div[data-role='content']").empty();
	var title = a.attr("data-title");
	$("#league h1").html(title);

	var link = a.attr("data-table");

	var anews = localStorage.getItem('lTable_' + link);
	if (anews) {
		anews = JSON.parse(anews);
		drawLeagueTable(anews, a);
	} else {
		$.ajax({
			type : "POST",
			url : "http://boum.ir/test/proxy.php",
			dataType : "html",
			data : {
				url : link
			},
			async : true,
			success : function(data) {
				var anews = JSON.stringify(data);
				localStorage.setItem('lTable_' + link, anews);
				drawLeagueTable(data,a);
			},
			error : function(data) {
			}
		});
	}
}

//--------------------------------------------------------
function drawLeagueTable(data, a) {
	var data = $("<div>" + data + "</div>");
	data.find("#anc div#anc-op style").remove();
	data = data.find("#anc div#anc-op");
	$("#league div[data-role='content']").append(data);
	$("#league #anc-op table tbody tr td table tbody tr.trheader").html("<h1>جدول مسابقات</h1>")
	showLeague(a);
}

//--------------------------------------------------------
function iconsPos() {
	var cCoutn = $("#ul-icons li").length;
	var wli = 144;
	var ww = parseInt($("#home.ui-page div.ui-content").width());
	var c = Math.floor(ww / wli);
	c = Math.min(cCoutn, c);
	var w = c * wli;
	var dif = ww - w;
	$("#ul-icons").css({
		"right" : (dif / 2) + "px"
	});
}
