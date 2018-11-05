const equipment= {

	/* EQUIPMENT */

	addEquipment(){
		return `/equipment`;
	},

	editEquipment(){
		return `/equipment`;
	},

	getEquipmentAll(){
		return `/equipment/all`;
	},

	getEquipmentById(obj){
		return `/equipment/id/` + obj.id;
	},

}

module.exports= equipment;