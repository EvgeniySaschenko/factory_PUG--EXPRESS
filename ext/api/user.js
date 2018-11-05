const user= {

	/** USER */

	addUser: ()=>{
		return `/user`;
	},

	getUserById: (obj)=>{
		return `/user/id/` + obj.id;
	}

}

module.exports= user;