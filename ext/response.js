let response= (obj, res, next) => {
	obj
		.then((data)=>{
			res.status(200);
			res.json(data);
			res.end();
		})
		.catch((err)=>{
			res.status(200);
			res.json(err.data);
			console.log( err );
			res.end();
		})
}

module.exports= response;