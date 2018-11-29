const division= {

	/* DIVISION */

	addDivision(){
		return {
			action: `/api/division`,
			method: 'post'
		}
	},

	editDivision(){
		return {
			action: `/api/division`,
			method: 'put'
		}
	},

	getDivisionAll(){
		return {
			action: `/api/division`,
			method: 'get'
		}
	},

	/* RANK */

	addRank(){
		return {
			action: `/api/division/rank`,
			method: 'post'
		}
	},

	editRank(){
		return {
			action: `/api/division/rank`,
			method: 'put'
		}
	},
	
}

module.exports= division;