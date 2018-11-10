const docAutomatMap= {

	/* DOC AUTOMAT MAP */

	addAutomatMap: ()=>{
		return `/api/doc-automat-map`;
	},

	editAutomatMap: ()=>{
		return `/api/doc-automat-map`;
	},

	getAutomatMapById: (obj)=>{
		return `/api/doc-automat-map/id/` + obj.id;
	},

	/* DOC AUTOMAT MAP ITEM */

	addAutomatMapItem: ()=>{
		return `/api/doc-automat-map/item`;
	},

	editAutomatMapItem: ()=>{
		return `/api/doc-automat-map/item`;
	},

	getAutomatMapItemAll: (obj)=>{
		return `/api/doc-automat-map/item/id_automat_map/` + obj.id_automat_map;
	},
	
}

module.exports= docAutomatMap;