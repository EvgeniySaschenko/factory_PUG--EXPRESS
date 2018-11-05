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
			action: `/division`,
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
			action: `/division/rank`,
			method: 'post'
		}
	},

	editRank(){
		return {
			action: `/division/rank`,
			method: 'put'
		}
	},

	getRankByIdDividion(obj){
		return {
			action: `/division/rank/id_division/` + obj.id_division,
			method: 'get'
		}
	},

}

module.exports= division;