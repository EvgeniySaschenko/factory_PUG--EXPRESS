const docAutomatMap= {

	/* DOC AUTOMAT MAP */

	addAutomatMap: ()=>{
		return {
			action: `/api/doc-automat-map`,
			method: 'post'
		}
	},

	editAutomatMap: (obj)=>{
		return {
			action: `/api/doc-automat-map/id/` + obj.id,
			method: 'put'
		}
	},

	getAutomatMapById: (obj)=>{
		return {
			action: `/api/doc-automat-map/id/` + obj.id,
			method: 'get'
		}
	},

	/* DOC AUTOMAT MAP ITEM */

	addAutomatMapItem: ()=>{
		return {
			action: `/api/doc-automat-map/item`,
			method: 'post'
		}
	},

	editAutomatMapItem: (obj)=>{
		return {
			action: `/api/doc-automat-map/item/id/` + obj.id,
			method: 'put'
		}
	},

	getAutomatMapItemAll: (obj)=>{
		return {
			action: `/api/doc-automat-map/item/id_automat_map/` + obj.id_automat_map,
			method: 'get'
		}
	},
	
}

module.exports= docAutomatMap;