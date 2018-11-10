const docRoutMap= {

	/* DOC ROUT MAP */

	addRoutMap: ()=>{
		return `/api/doc-rout-map`;
	},

	editRoutMap: ()=>{
		return `/api/doc-rout-map`;
	},

	getRoutMapById: (obj)=>{
		return `/api/doc-rout-map/id/` + obj.id;
	},

	/* DOC ROUT MAP ITEM */

	addRoutMapItem: ()=>{
		return `/api/doc-rout-map/item`;
	},

	editRoutMapItem: ()=>{
		return `/api/doc-rout-map/item`;
	},

	getRoutMapItemAll: (obj)=>{
		return `/api/doc-rout-map/item/id_rout_map/` + obj.id_rout_map;
	},
	
}

module.exports= docRoutMap;