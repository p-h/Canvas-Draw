window.DrawingApp = window.DrawingApp || {}
window.DrawingApp.View = (function() {
	function loadImageList() {
		var list = $("#drawing-item-list")
		var drawingItems = DrawingApp.DB.readDrawingItems()
		var listItems = _(drawingItems).map(function(item) {
			return $("<li>", {
				html : [$("<div>", {
					text : item.title
				}), $("<img>", {
					"class" : "drawing-image drawing-image-thumbnail",
					src : item.dataUrl,
					alt : item.title
				}), $("<div>", {
					"class" : "display-button ui-btn-left",
					"data-role" : "button",
					"data-icon" : "arrow-r",
					"data-iconpos" : "notext",
					"data-drawing-item" : JSON.stringify(item)
				}), $("<div>", {
					"class" : "ui-btn-right delete-button",
					"data-drawing-item-id" : item.id,
					"data-role" : "button",
					"data-icon" : "delete",
					"data-iconpos" : "notext",
				})]
			})
		})

		list.empty()
		_(listItems).each(function(item) {
			list.append(item)
		})

		list.trigger("create")
	}

	function displayDrawingItem(item) {
		var page = $("#display")
		var title = page.find("#title")
		var image = page.find("#image")
		var deleteButton = page.find("#delete")
		title.text(item.title);
		image.attr("src", item.dataUrl);
		image.attr("alt", item.title);
		deleteButton.attr("data-drawing-item-id", item.id)
	}

	return {
		loadImageList : loadImageList,
		displayDrawingItem : displayDrawingItem
	}
})()

