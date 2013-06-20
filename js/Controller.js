$(function() {
	// Register Events
	$("#drawing-item-list").on("click", "li", function() {
		var itemStr = $(this).attr("data-drawing-item");
		var item = JSON.parse(itemStr)
		if (item) {
			DrawingApp.DB.setCurrentItem(item)
			$.mobile.navigate("#display");
		}
	})

	$("#drawing-item-list").on("click", ".delete-button", function() {
		var id = $(this).attr("data-drawing-item-id");
		if (id) {
			DrawingApp.DB.deleteDrawingItemById(id);
		}

		DrawingApp.View.loadImageList()
		$.mobile.navigate("#home")
	})

	$("#home").on("pagebeforeshow", function() {
		DrawingApp.View.loadImageList()
	})

	$("#display").on("pagebeforeshow", function() {
		var item = DrawingApp.DB.getCurrentItem()
		if (item) {
			DrawingApp.View.displayDrawingItem(item)
		} else {
			$.mobile.navigate("#home")
		}
	})
})

