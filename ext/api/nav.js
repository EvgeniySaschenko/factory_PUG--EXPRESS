const nav= {

	/** NAV */

	getNavByType(obj){
		return `/api/nav/type/` + obj.type;
	},
	
}

module.exports= nav;