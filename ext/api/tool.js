const tool= {

	/** TOOL */
	
	addTool(){
		return {
			action: `/api/tool`,
			method: 'post'
		}
	},

	editTool(obj){
		return {
			action: `/api/tool/id/` + obj.id,
			method: 'put'
		}
	},

	getToolByType(obj){
		return {
			action: `/api/tool/id_type/` + obj.id_type,
			method: 'get'
		}
	},
	
	/** TOOL TYPE */

	addType(){
		return {
			action: `/api/tool/type`,
			method: 'post'
		}
	},

	editType(obj){
		return {
			action: `/api/tool/type/id` + obj.id,
			method: 'put'
		}
	},

	getToolType(){
		return {
			action: `/api/tool/type`,
			method: 'get'
		}
	},

}
	
	module.exports= tool;