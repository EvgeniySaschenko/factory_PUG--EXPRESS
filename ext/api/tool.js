const tool= {

	/** TOOL */
	
	addTool(){
		return `/api/tool`;
	},

	editTool(){
		return `/api/tool`;
	},

	getToolByType(obj){
		return `/api/tool/id_type/` + obj.id_type;
	},
	
	/** TOOL TYPE */

	addType(){
		return `/api/tool/type`;
	},

	editType(){
		return `/api/tool/type`;
	},

	ggetToolType(){
		return `/api/tool/type`;
	},

}
	
	module.exports= tool;