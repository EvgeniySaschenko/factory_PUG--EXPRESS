const docRoutMap= {

	/* DOC ROUT MAP */

	addRoutMap: ()=>{
		return {
			action: `/api/doc-rout-map`,
			method: 'post'
		}
	},

	editRoutMap: ()=>{
		return {
			action: `/api/doc-rout-map`,
			method: 'put'
		}
	},

	getRoutMapSearch: (obj= false)=>{
		let { name= '@dummy', num_detail= '@dummy', date_create= '@dummy' }= obj;
		return {
			action: `/api/doc-rout-map/search/name/` + name + `/num_detail/` + num_detail + `/date_create/` + date_create,
			method: 'get'
		}
	},

	/**
	 * DOWNLOAD | VIEW
	 */

	downloadRoutMap: (obj= false)=>{
		let { id= '@dummy' }= obj;
		return {
			action: `/api/doc-rout-map/download/id/` + id,
			method: 'get',
			url: `/api/doc-rout-map/download/id/`
		}
	},

	viewRoutMap: (obj= false)=>{
		let { id= '@dummy' }= obj;
		return {
			action: `/api/doc-rout-map/view/id/` + id,
			method: 'get',
			url: `/api/doc-rout-map/view/id/`
		}
	},

	/* DOC ROUT MAP ITEM */

	addRoutMapItem: ()=>{
		return {
			action: `/api/doc-rout-map/item`,
			method: 'post'
		}
	},

	editRoutMapItem: ()=>{
		return {
			action: `/api/doc-rout-map/item`,
			method: 'put'
		}
	},
	
}

module.exports= docRoutMap;