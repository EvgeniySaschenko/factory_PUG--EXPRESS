const tool= {

	/** TOOL */
	
	addTool(){
		return {
			action: `/api/tool`,
			method: 'post'
		}
	},
	
	/** TOOL TYPE */

	addType(){
		return {
			action: `/api/tool/type`,
			method: 'post'
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