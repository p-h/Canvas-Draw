window.DrawingApp = window.DrawingApp || {}
window.DrawingApp.Model = (function() {
	function DrawingItem(id, title, dataUrl) {
		this.id = id
		this.title = title
		this.dataUrl = dataUrl
	}

	return {
		DrawingItem : DrawingItem
	}
})()
