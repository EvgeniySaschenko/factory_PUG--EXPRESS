const docRoutMap= {

	/* DOC ROUT MAP */

	addRoutMap: ()=>{
		return `/doc-rout-map`;
	},

	editRoutMap: ()=>{
		return `/doc-rout-map`;
	},

	getRoutMapById: (obj)=>{
		return `/doc-rout-map/id/` + obj.id;
	},

	/* DOC ROUT MAP ITEM */

	addRoutMapItem: ()=>{
		return `/doc-rout-map/item`;
	},

	editRoutMapItem: ()=>{
		return `/doc-rout-map/item`;
	},

	getRoutMapItemAll: (obj)=>{
		return `/doc-rout-map/item/id_rout_map/` + obj.id_rout_map;
	},
	
}

module.exports= docRoutMap;