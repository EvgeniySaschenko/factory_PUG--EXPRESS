const material= {
	
	/* MATERIAL */

	addMaterial(){
		return {
			action: `/api/material`,
			method: 'post'
		}
	},

	editMaterial(){
		return {
			action: `/api/material`,
			method: 'put'
		}
	},

	getMaterialByTypeAndUse(obj){
		return {
			action: `/api/material/id_type/` + obj.id_type + `/id_use/` + obj.id_use,
			method: 'get'
		}
	},

	getMaterialSearch(obj= false){
		let { id_type= '@dummy', id_use= '@dummy', mark= '@dummy' }= obj;
		return {
			action: `/api/material/search/id_type/` + id_type + `/id_use/` + id_use + `/mark/` + mark,
			method: 'get'
		}
	},
	
	/** MATERIAL TYPE */

	addType(){
		return {
			action: `/api/material/type`,
			method: 'post'
		}
	},

	editType(){
		return {
			action: `/api/material/type`,
			method: 'put'
		}
	},

	getMaterialTypeAll(){
		return {
			action: `/api/material/type/all`,
			method: 'get'
		}
	},

}

module.exports= material;