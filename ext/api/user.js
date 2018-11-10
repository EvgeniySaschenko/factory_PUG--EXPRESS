const user= {

	/** USER */

	addUser: ()=>{
		return `/api/user`;
	},

	getUserById: (obj)=>{
		return `/api/user/id/` + obj.id;
	}

}

module.exports= user;