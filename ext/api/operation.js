const operation= {

/** OPERATION */

	addOperation(){
		return {
			action: `/api/operation`,
			method: 'post'
		}
	},

	editOperation(){
		return {
			action: `/api/operation`,
			method: 'put'
		}
	},

	getOperationAll(){
		return {
			action: `/api/operation/all`,
			method: 'get'
		}
	},

}

module.exports= operation;