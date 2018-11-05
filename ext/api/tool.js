const tool= {

	/** TOOL */
	
	addTool(){
		return `/tool`;
	},

	editTool(){
		return `/tool`;
	},

	getToolByType(obj){
		return `/tool/id_type/` + obj.id_type;
	},
	
	/** TOOL TYPE */

	addType(){
		return `/tool/type`;
	},

	editType(){
		return `/tool/type`;
	},

	ggetToolType(){
		return `/tool/type`;
	},

}
	
	module.exports= tool;