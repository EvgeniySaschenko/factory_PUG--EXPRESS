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

	getMaterialById(obj){
		return {
			action: `/api/material/id/` + obj.id,
			method: 'get'
		}
	},

	getMaterialByTypeAndUse(obj){
		return {
			action: `/api/material/id_type/` + obj.id_type + `/id_use/` + obj.id_use,
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