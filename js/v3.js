function footballNewsList(URL,elm) {
	$.ajax({
		type : "POST",
		url : "http://boum.ir/test/proxy.php",
		dataType : "html",
		data : {
			url : URL
		},
		async : true,
		success : function(data) {
			$("#"+elm+" #ul-news").empty();
			var data = $("<div>" + data + "</div>");
			$(data).find(".inbndata ul li a").each(function() {
				var title = $(this).text();
				var link = 	$(this).attr("href");
				$("#"+elm+" #ul-news").append("<li><a data-title='"+title+"' data-link='"+link+"' style='direction:rtl;text-align:right;' href='#anews' data-transition='slide'>" + title + "</a></li>");
				$("#"+elm+" #ul-news").listview("refresh");
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
			$(data).find(".inbndata ul li a").each(function() {
				var title = $(this).text();
				var link = 	$(this).attr("href");
				$("#"+elm+" #ul-news").append("<li><a data-title='"+title+"' data-link='"+link+"' style='direction:rtl;text-align:right;' href='#anews' data-transition='slide'>" + title + "</a></li>");
				$("#"+elm+" #ul-news").listview("refresh");
			});
		},
		error : function(data) {
		}
	});
}
//--------------------------------------------------------
function showNews(a) {
	$.mobile.showPageLoadingMsg();
	$("#anews div[data-role='content']").empty();
	$("#anews h1").empty();
	var title = a.attr("data-title");
	var link = a.attr("data-link");
	$("#anews h1").html(title);
	$.ajax({
		type : "POST",
		url : "http://boum.ir/test/proxy.php",
		dataType : "html",
		data : {
			url : link
		},
		async : true,
		success : function(data) {
			var data = $("<div>" + data + "</div>");
			var img = $(data).find("#CenterTable table#NewsTable img").attr("src");
			var lead = $(data).find("#CenterTable table#NewsTable h2").text();
			var text = $(data).find("#CenterTable table:nth-child(2) tr:nth-child(2) td").html();
			console.log(text);
			
			$("#anews div[data-role='content']").html("<div id='news_row'></div>")
			$("#anews div[data-role='content'] #news_row").html("<div id='news_img'><img src='"+img+"' /></div>");			 
			$("#anews div[data-role='content'] #news_row").append("<div id='news_lead'>"+lead+"</div>");			 
			$("#anews div[data-role='content']").append("<div id='news_text'>"+text+"</div>");			 
			//$.mobile.hidePageLoadingMsg();
		},
		error : function(data) {
		}
	});
}
//--------------------------------------------------------
function showLeague(a) {
	var link = a.attr("data-link");
	$.ajax({
		type : "POST",
		url : "http://boum.ir/test/proxy.php",
		dataType : "html",
		data : {
			url : link
		},
		async : true,
		success : function(data) {
			$("#league #anc-op").show();
			var data = $("<div>" + data + "</div>");
			var wTitle 	= data.find("ul:nth-child(1) li").html();
			var wDate 	= data.find("ul:nth-child(2) li").html();
			data.find("ul:nth-child(1)").remove();
			data.find("ul:nth-child(1)").remove();
			$("#league div[data-role='content']").append("<h1>"+wTitle+"</h1>");
			//$("#league div[data-role='content']").append("<h2>"+wDate+"</h2>");
			$("#league div[data-role='content']").append(data.find(".league-table"));
		},
		error : function(data) {
		}
	});	
}
//--------------------------------------------------------
function showLeagueTable(a) {
	$("#league h1").empty();
	$("#league div[data-role='content']").empty();
	var title = a.attr("data-title");
	$("#league h1").html(title);
	
	var link = a.attr("data-table");
	$.ajax({
		type : "POST",
		url : "http://boum.ir/test/proxy.php",
		dataType : "html",
		data : {
			url : link
		},
		async : true,
		success : function(data) {
			var data = $("<div>" + data + "</div>");
			data.find("#anc div#anc-op style").remove();
			data = data.find("#anc div#anc-op");
			$("#league div[data-role='content']").append(data);
			$("#league #anc-op table tbody tr td table tbody tr.trheader").html("<h1>جدول مسابقات</h1>")
			showLeague(a);
		},
		error : function(data) {
		}
	});		
}