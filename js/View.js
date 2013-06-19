window.DrawingApp = window.DrawingApp || {}
window.DrawingApp.View = (function() {
	function loadImageList() {
		var list = $("#drawing-item-list")
		var drawingItems = DrawingApp.DB.readDrawingItems()
		var listItems = _(drawingItems).map(function(item) {
			return $("<li>", {
				text : item.title
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
