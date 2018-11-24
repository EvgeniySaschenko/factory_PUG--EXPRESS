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

	getRoutMapById: (obj)=>{
		return {
			action: `/api/doc-rout-map/id/` + obj.id,
			method: 'get'
		}
	},

	getRoutMapSearch: (obj= false)=>{
		let { name= '@dummy', num_detail= '@dummy', date_create= '@dummy' }= obj;
		return {
			action: `/api/doc-rout-map/search/name/` + name + `/num_detail/` + num_detail + `/date_create/` + date_create,
			method: 'get'
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

	getRoutMapItemAll: (obj)=>{
		return {
			action: `/api/doc-rout-map/item/id_rout_map/` + obj.id_rout_map,
			method: 'put'
		}
	},
	
}

module.exports= docRoutMap;