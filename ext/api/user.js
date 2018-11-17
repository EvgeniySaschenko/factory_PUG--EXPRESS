const user= {

	/** USER */

	addUser: ()=>{
		return {
			action: `/api/user`,
			method: 'post'
		}
	},

	getUserById: (obj)=>{
		return {
			action: `/api/user/id/` + obj.id,
			method: 'get'
		}
	}

}

module.exports= user;