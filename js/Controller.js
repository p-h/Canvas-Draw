$(function() {
	// Register Events
	$("#drawing-item-list").on("click", "li", function() {
		var item = $(this).attr("data-item");
		if(item) {
			sessionStorage.setItem("selected_item", item);
			$.mobile.changePage("#display");
		}
	})

	$("#delete").click(function() {
		var id = $(this).attr("data-id");
		if(id) {
			DrawingApp.DB.deleteDrawingItemById(id);
			$.mobile.navigate("#home")
		}
	});

})

