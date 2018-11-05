let response= (obj, res, next) => {
	obj
		.then((data)=>{
			res.status(200);
			res.json(data);
			next();
		})
		.catch((err)=>{
			res.status(200);
			res.json(err.data);
			console.log( err );
			next();
		})
}

module.exports= response;