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

	getOperatingMapById: (obj)=>{
		return {
			action: `/api/doc-operating-map/id/` + obj.id,
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

	getOperatingMapItemAll: (obj)=>{
		return {
			action: `/api/doc-operating-map/item/id_operating_map/` + obj.id_operating_map,
			method: 'get'
		}
	},
	
}

module.exports= docOperatingMap;