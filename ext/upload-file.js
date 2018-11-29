let fs= require('fs');

let uploadFile= {
	// Загрузка чертежа в операционную карту
	drawingOperatingMap: function(req, id){

		fs.readFile(req.files.file_drawing.path, function(err,data) {
			fs.writeFile(__APPROOT + '/public/img/' + id + 'jpg', data, function(err) {
				if(!err){
					
				}

			})
		})

	}
}