$(function() {
	// Register Events
	$("#drawing-item-list").on("click", ".display-button", function() {
		var itemStr = $(this).attr("data-drawing-item");
		if (itemStr) {
			var item = JSON.parse(itemStr)
			if (item) {
				DrawingApp.DB.setCurrentItem(item)
				$.mobile.navigate("#display");
			}
		}
	})

	$("#drawing-item-list, #display").on("click", ".delete-button", function() {
		var id = $(this).attr("data-drawing-item-id");
		if (id) {
			DrawingApp.DB.deleteDrawingItemById(id);
		}

		DrawingApp.View.loadImageList()
		$.mobile.navigate("#home")
	})

	$("#save-drawing").click(function() {
		var canvas = $("#canvas")[0]
		var title = "TODO"
		var dataUrl = canvas.toDataURL()

		var item = new DrawingApp.Model.DrawingItem(null, title, dataUrl)
		DrawingApp.DB.insertDrawingItem(item)

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

	$("#create-drawing").on("pagebeforeshow", function() {
		//Canvas Element und Context holen
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');

		// clear
		canvas.width = canvas.width

		//Event Listener hinzufügen. Wenn der User die Zeichenfläche
		//berürht, startet er den touchstart Event, bewegt er den
		//Finger, beginnt das touchmove Event, hebt er den Finger
		//beginnt das touchend Event. Alle 3 rufen die draw Funktion auf.
		canvas.addEventListener('touchstart', draw, false);
		canvas.addEventListener('touchmove', draw, false);
		canvas.addEventListener('touchend', draw, false);

		//Das Zeichentool.
		var pen = {
			isDrawing : false, //Am Anfang ist isDrawing auf false gesetzt, da noch nicht gezeichnet wird.

			//Sobald der User zu zeichnen beginnt, holt sich touchstart die Position des Fingers.
			touchstart : function(position) {
				context.beginPath();
				//Der Path wird begonnen.
				context.moveTo(position.x, position.y);
				//Startposition wird auf die geholten Koordinaten gesetzt.
				this.isDrawing = true;
				//Der User zeichnet jetzt, also ist isDrawing nun true.
			},

			//Bewegt sich der Finger, müssen die neuen Koordinaten geholt werden.
			touchmove : function(position) {
				//Ist der User am zeichnen, wird eine Linie von den Anfangskoordinaten zu
				//den neuen Koordinaten gezeichnet
				if (this.isDrawing) {
					context.lineTo(position.x, position.y);
					context.stroke();
				}
			},
			// Hebt der User den Finger werden die letzten Koordinaten geholt.
			touchend : function(position) {
				//war der User am zeichnen, wird der letzte Teil der Linie noch gezeichnet.
				//Dies geschieht über einen Aufruf von touchmove. Danach wird isDrawing auf
				//false gesetzt.
				if (this.isDrawing) {
					this.touchmove(position);
					this.isDrawing = false;
				}
			}
		}

		//Funktion, die die Events handelt und die Koordinaten holt und
		//an pen weiterleitet.
		function draw(event) {
			//Prüfen, ob nur ein Finger gerade auf dem Bildschirm ist
			if (event.targetTouches.length == 1) {
				//Koordinaten werden geholt
				var position = {
					x : event.targetTouches[0].clientX - getOffsetLeft(canvas),
					y : event.targetTouches[0].clientY - getOffsetTop(canvas)
				};

				function getOffsetLeft(elem) {
					var offsetLeft = 0;
					do {
						if (!isNaN(elem.offsetLeft)) {
							offsetLeft += elem.offsetLeft;
						}
					} while( elem = elem.offsetParent );
					return offsetLeft;
				}

				function getOffsetTop(elem) {
					var offsetTop = 0;
					do {
						if (!isNaN(elem.offsetTop)) {
							offsetTop += elem.offsetTop;
						}
					} while( elem = elem.offsetParent );
					return offsetTop;
				}

				//Koordinaten werden übergeben
				pen[event.type](position);
			}

		}

		//Verhindert, dass der Device automatisch elastisch scrollt.
		document.body.addEventListener('touchmove', function(event) {
			event.preventDefault();
		}, false);

	})
})

