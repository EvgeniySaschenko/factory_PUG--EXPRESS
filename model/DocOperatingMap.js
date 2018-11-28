let db= require(__APPROOT + '/ext/db.js');
let nconf= require(__APPROOT + '/config');

class DocOperatingMap{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}
	
	/* DOC OPERATING MAP */

	/**
	 * 
	 * Добавляется при создании операции в классе DocRoutMap при добавлении операции
	 */

	/*
	addOperatingMap(obj){
		let { id_visitor, id_rout_map_item, id_material }= obj;

		return new Promise((resolve, reject)=>{
				this.db.getConnection((err, connection)=>{
					if(!err){
						connection.query(`INSERT
							INTO ff_doc_operating_map
								(id_visitor_create, 
								id_rout_map_item, 
								id_material)
							VALUE(?, ?, ?)`,
							[id_visitor, id_rout_map_item, id_material],
							(err, data= false)=>{
								let { insertId }= data;
								insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
								connection.release();
							});
					} else {
						reject( { data: this.msg.err, err : err } );
					}
				});
			})
	}
	*/
	editOperatingMap(req){
		let { id, id_equipment, firmness, ev, md, profile, mz, koid, program, t_o, t_v, t_pz, t_st, emulsion, approve_1= '{}', approve_2= '{}', approve_3= '{}', approve_4= '{}', approve_5= '{}', approve_6= '{}', approve_7= '{}', approve_8= '{}', remark}= req.body;
		let { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`UPDATE ff_doc_operating_map
						SET
							id_visitor_update= ?, 
							id_equipment= ?, 
							firmness= ?, 
							ev= ?, 
							md= ?, 
							profile= ?, 
							mz= ?, 
							koid= ?, 
							program= ?, 
							t_o= ?, 
							t_v= ?, 
							t_pz= ?, 
							t_st= ?, 
							emulsion= ?, 
							approve_1= ?, 
							approve_2= ?, 
							approve_3= ?, 
							approve_4= ?, 
							approve_5= ?, 
							approve_6= ?, 
							approve_7= ?, 
							approve_8= ?,
							date_update= CURRENT_TIMESTAMP,
							remark= ?
						WHERE id= ?`,
						[id_visitor, id_equipment, firmness, ev, md, profile, mz, koid, program, t_o, t_v, t_pz, t_st, emulsion, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8, remark, id],
						(err, data= false)=>{
							let { affectedRows }= data;
							affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

	getOperatingMapById(id){

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							om.*,
							eq.name as equipment_name,
							eq.model as equipment_model,
							eq.num as equipment_num,
							rm.name,
							rm.num_detail,
							op.name as operation_name,
							rmi.num_operation as operation_num,
							m.mark as material_mark,
							m.standart as material_standart,
							mt.name as material_name
						FROM ff_doc_operating_map om
						LEFT OUTER JOIN ff_doc_rout_map_item rmi ON om.id_rout_map_item = rmi.id
						LEFT OUTER JOIN ff_doc_rout_map rm ON rmi.id_rout_map = rm.id
						LEFT OUTER JOIN ff_material m ON rm.id_material = m.id
						LEFT OUTER JOIN ff_material_type mt ON m.id_type = mt.id
						LEFT OUTER JOIN ff_equipment eq ON om.id_equipment = eq.id
						LEFT OUTER JOIN ff_operation op ON rmi.id_operation = op.id
						WHERE om.id= ?`,
						[id],
						(err, data)=>{
							data ? resolve(data[0]) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}


	getOperatingMapAll(id_rout_map){

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							om.*,
							DATE_FORMAT(om.date_create, '%d.%m.%Y') as date_create,
							op.name
						FROM ff_doc_operating_map om
						INNER JOIN ff_doc_rout_map_item rmi ON om.id_rout_map_item = rmi.id
						INNER JOIN ff_operation op ON rmi.id_operation = op.id
						WHERE  rmi.id_rout_map= ? AND rmi.del= 0
						ORDER BY rmi.num_operation ASC, rmi.id ASC`,
						[id_rout_map],
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

	/* DOC OPERATING MAP ITEM */

	addOperatingMapItem(req){
		let { id_operating_map, num_operation, description, val_pi, val_d_v, val_l, val_t, val_i, val_s, val_n, val_v, val_t_o, val_t_v }= req.body;
		let { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
				this.db.getConnection((err, connection)=>{
					if(!err){
						connection.query(`INSERT
							INTO ff_doc_operating_map_item
								(id_visitor_create, 
								id_operating_map, 
								num_operation, 
								description, 
								val_pi, 
								val_d_v, 
								val_l, 
								val_t, 
								val_i, 
								val_s, 
								val_n, 
								val_v, 
								val_t_o, 
								val_t_v)
							VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
							[id_visitor, id_operating_map, num_operation, description, val_pi, val_d_v, val_l, val_t, val_i, val_s, val_n, val_v, val_t_o, val_t_v],
							(err, data= false)=>{
								let { insertId }= data;
								insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
								connection.release();
							});
					} else {
						reject( { data: this.msg.err, err : err } );
					}
				});
			})
	}
	
	editOperatingMapItem(req){
		let { id, num_operation, description, val_pi, val_d_v, val_l, val_t, val_i, val_s, val_n, val_v, val_t_o, val_t_v, del }= req.body;
		let { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			for(let j= 0, l= id.length; l > j; j++){
				console.log( id_visitor, num_operation[j], description[j], val_pi[j], val_d_v[j], val_l[j], val_t[j], val_i[j], val_s[j], val_n[j], val_v[j], val_t_o[j], val_t_v[j], del[j], id[j] )
				this.db.getConnection((err, connection)=>{
					if(!err){
						connection.query(`UPDATE ff_doc_operating_map_item
							SET
								id_visitor_update= ?, 
								num_operation= ?, 
								description= ?, 
								val_pi= ?, 
								val_d_v= ?, 
								val_l= ?, 
								val_t= ?, 
								val_i= ?, 
								val_s= ?, 
								val_n= ?, 
								val_v= ?, 
								val_t_o= ?, 
								val_t_v= ?, 
								date_update= CURRENT_TIMESTAMP,
								del= ?
							WHERE id= ?`,
							[id_visitor, num_operation[j], description[j], val_pi[j], val_d_v[j], val_l[j], val_t[j], val_i[j], val_s[j], val_n[j], val_v[j], val_t_o[j], val_t_v[j], del[j], id[j]],
							(err, data= false)=>{
								let { affectedRows }= data;
								affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
								connection.release();
							});
					} else {
						reject( { data: this.msg.err, err : err } );
					}
				});
			}
		});
	}

	getOperatingMapItemAll(id_operating_map){

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_doc_operating_map_item
						WHERE id_operating_map= ? AND del= 0
						ORDER BY num_operation ASC, id ASC`,
						[id_operating_map],
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

}

module.exports= DocOperatingMap;