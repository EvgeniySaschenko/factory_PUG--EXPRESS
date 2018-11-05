const docAutomatMap= {

	/* DOC AUTOMAT MAP */

	addAutomatMap: ()=>{
		return `/doc-automat-map`;
	},

	editAutomatMap: ()=>{
		return `/doc-automat-map`;
	},

	getAutomatMapById: (obj)=>{
		return `/doc-automat-map/id/` + obj.id;
	},

	/* DOC AUTOMAT MAP ITEM */

	addAutomatMapItem: ()=>{
		return `/doc-automat-map/item`;
	},

	editAutomatMapItem: ()=>{
		return `/doc-automat-map/item`;
	},

	getAutomatMapItemAll: (obj)=>{
		return `/doc-automat-map/item/id_automat_map/` + obj.id_automat_map;
	},
	
}

module.exports= docAutomatMap;