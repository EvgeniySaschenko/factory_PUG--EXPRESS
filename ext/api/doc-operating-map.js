const docOperatingMap= {

	/* DOC AUTOMAT MAP */

	addOperatingMap: ()=>{
		return {
			action: `/api/doc-operating-map`,
			method: 'post'
		}
	},

	editOperatingMap: ()=>{
		return {
			action: `/api/doc-operating-map`,
			method: 'put'
		}
	},

	/**
	 * DOWNLOAD | VIEW
	 */

	downloadOperatingMap: (obj= false)=>{
		let { id= '@dummy' }= obj;
		return {
			action: `/api/doc-operating-map/download/id/` + id,
			method: 'get'
		}
	},

	viewOperatingMap: (obj= false)=>{
		let { id= '@dummy' }= obj;
		return {
			action: `/api/doc-operating-map/view/id/` + id,
			method: 'get'
		}
	},

	/* DOC AUTOMAT MAP ITEM */

	addOperatingMapItem: ()=>{
		return {
			action: `/api/doc-operating-map/item`,
			method: 'post'
		}
	},

	editOperatingMapItem: ()=>{
		return {
			action: `/api/doc-operating-map/item`,
			method: 'put'
		}
	},
	
}

module.exports= docOperatingMap;