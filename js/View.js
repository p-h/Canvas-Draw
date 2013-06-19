window.DrawingApp = window.DrawingApp || {}
window.DrawingApp.View = (function() {
	function loadImageList() {
		var list = $("#drawing-item-list")
		var drawingItems = DrawingApp.DB.readDrawingItems()
		var listItems = _(drawingItems).map(function(item) {
			return $("<li>", {
				text : item.title,
				"data-item": JSON.stringify(item)
			}).append($("<img>", {
				src : item.dataUrl,
				alt : item.title
			}))
		})

		list.empty()
		_(listItems).each(function(item) {
			list.append(item)
		})

		list.listview("refresh")
	}

	return {
		loadImageList : loadImageList
	}
})()


$(function() {
	$("#display").on("pagebeforeshow", function(event) {
		var item = JSON.parse(sessionStorage.getItem("selected_item"));
		if(item) {
			$(this).find("#title").text(item.title);
			$(this).find("#image").attr("src", item.dataURL);
			$(this).find("#image").attr("alt", item.title);
			$(this).find("#delete").attr("data-id", item.id);
		} else {
			// $.mobile.navigate("#home");
		}
	
	});
	
	$("#home").on("pagebeforeshow", function(event) {
		DrawingApp.View.loadImageList();
	});
})

