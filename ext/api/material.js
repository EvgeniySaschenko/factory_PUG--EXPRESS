const material= {
	
	/* MATERIAL */

	addMaterial(){
		return `/material`;
	},

	editMaterial(){
		return `/material`;
	},

	getMaterialById(obj){
		return `/material/id/` + obj.id;
	},

	getMaterialByTypeAndUse(obj){
		return `/material/id_type/` + obj.id_type + `/id_use/` + obj.id_use;
	},
	
	/** MATERIAL TYPE */

	addType(){
		return `/material/type`;
	},

	editType(){
		return `/material/type`;
	},

	getMaterialTypeAll(){
		return `/material/type/all`;
	},

}

module.exports= material;