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

	getEquipmentById(obj){
		return {
			action: `/api/equipment/id/` + obj.id,
			method: 'get'
		}
	},

}

module.exports= equipment;