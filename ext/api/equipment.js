const equipment= {

	/* EQUIPMENT */

	addEquipment(){
		return {
			action: `/api/equipment`,
			method: 'post'
		}
	},

	editEquipment(){
		return {
			action: `/api/equipment`,
			method: 'put'
		}
	},

	getEquipmentAll(){
		return {
			action: `/api/equipment/all`,
			method: 'get'
		}
	},

}

module.exports= equipment;