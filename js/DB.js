window.DrawingApp = window.DrawingApp || {}
window.DrawingApp.DB = (function() {
	var LOCALSTORAGE_KEY = "drawing-items"
	var LOCALSTORAGE_CURRENT_ITEM_KEY = "current-item"

	function writeDrawingItems(drawingItems) {
		var drawingItemsString = JSON.stringify(drawingItems)
		localStorage.setItem(LOCALSTORAGE_KEY, drawingItemsString)
	}

	function readDrawingItems() {
		var itemsString = localStorage.getItem(LOCALSTORAGE_KEY)
		var items = JSON.parse(itemsString)
		return items || []
	}

	function insertDrawingItem(drawingItem) {
		drawingItem.id = DrawingApp.Utils.newGuid()
		var drawingItems = readDrawingItems()
		drawingItems.push(drawingItem)
		writeDrawingItems(drawingItems)
	}

	function updateDrawingItem(itemToUpdate) {
		var existingItems = readDrawingItems()
		var existingItem = _(existingItems).findWhere({
			id : itemToUpdate.id
		})
		if (!existingItem) {
			throw "Tried to update item that did not exist"
		}

		var items = _(existingItems).filter(function(item) {
			return item.id !== itemToUpdate.id
		})

		items.push(itemToUpdate)
		writeDrawingItems(items)
	}

	function deleteDrawingItemById(id) {
		var existingItems = readDrawingItems()
		var existingItem = _(existingItems).findWhere({
			id : id
		})
		if (!existingItem) {
			throw "Tried to delete item that does not exist."
		}

		var itemsToWrite = _(existingItems).filter(function(item) {
			return item.id !== id
		})
		writeDrawingItems(itemsToWrite)
	}

	function setCurrentItem(item) {
		var itemString = JSON.stringify(item)
		localStorage.setItem(LOCALSTORAGE_CURRENT_ITEM_KEY, itemString)
	}

	function getCurrentItem(item) {
		var itemString = localStorage.getItem(LOCALSTORAGE_CURRENT_ITEM_KEY)
		var item = JSON.parse(itemString)
		return item
	}

	return {
		setCurrentItem : setCurrentItem,
		getCurrentItem : getCurrentItem,
		insertDrawingItem : insertDrawingItem,
		readDrawingItems : readDrawingItems,
		updateDrawingItem : updateDrawingItem,
		deleteDrawingItemById : deleteDrawingItemById
	}
})()
