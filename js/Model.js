(function() {
	window.DrawingApp = window.DrawingApp || {}
	$.extend(window.DrawingApp, {
		DrawingItem : function(id, title, dataUrl) {
			this.id = id
			this.title = title
			this.dataUrl = dataUrl
		},
		// TODO: Remove
		DummyDrawingItems : [new DrawingItem("d5981622-ad7d-4184-88c6-f0a9ee9cc00e", "foo", null), new DrawingItem("5848c8ae-4767-49d1-a973-77089646f1f6", "bar", null), new DrawingItem("5ee372ec-d15d-4d2d-a4ea-88ab439f8485", "baz", null)]
	})
})()
