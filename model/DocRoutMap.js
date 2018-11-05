const db= require(__APPROOT + '/ext/db.js');
const nconf= require(__APPROOT + '/config');

class DocRoutMap{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}

	addRoutMap(req){
		const { id_material, name, num_detail, weight, units_measure, type_ingot, size_d, size_w, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8 }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
				this.db.getConnection((err, connection)=>{
					if(!err){
						connection.query(`INSERT
							INTO ff_doc_rout_map
								(id_visitor_create, 
								id_material, 
								name, 
								num_detail, 
								weight, 
								units_measure, 
								type_ingot, 
								size_d, 
								size_w, 
								approve_1, 
								approve_2, 
								approve_3, 
								approve_4, 
								approve_5,
								approve_6, 
								approve_7, 
								approve_8)
							VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
							[id_visitor, id_material, name, num_detail, weight, units_measure, type_ingot, size_d, size_w, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8],
							(err, data= false)=>{
								const { insertId }= data;
								insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
								connection.release();
							});
					} else {
						reject( { data: this.msg.err, err : err } );
					}
				});
			})
	}

	editRoutMap(req){
		const { id, id_material, name, num_detail, weight, units_measure, type_ingot, size_d, size_w, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8 }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`UPDATE ff_doc_rout_map
						SET
							id_visitor_update= ?, 
							id_material= ?, 
							name= ?, 
							num_detail= ?, 
							weight= ?, 
							units_measure= ?, 
							type_ingot= ?, 
							size_d= ?, 
							size_w= ?, 
							approve_1= ?, 
							approve_2= ?, 
							approve_3= ?, 
							approve_4= ?, 
							approve_5= ?, 
							approve_6= ?, 
							approve_7= ?,  
							approve_8= ?, 
							date_update= ?
						WHERE id= ?`,
						[id_visitor, id_material, name, num_detail, weight, units_measure, type_ingot, size_d, size_w, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8, 'CURRENT_TIMESTAMP', id],
						(err, data= false)=>{
							const { affectedRows }= data;
							affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

	getRoutMapById(req){
		const { id }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_doc_rout_map
						WHERE id= ?`,
						[id],
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

	/* DOC ROUT MAP ITEM */

	addRoutMapItem(req){
		const { id_rout_map, id_material, id_rank, num_shop, num_area, rm, num_operation, sm, rank_level, ut, kr, koid, en, op, kst, tpz, tst }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
				this.db.getConnection((err, connection)=>{
					if(!err){
						connection.query(`INSERT
							INTO ff_doc_rout_map_item
								(id_visitor_create, 
								id_rout_map, 
								id_material, 
								id_rank, 
								num_shop, 
								num_area, 
								rm, 
								num_operation, 
								sm, 
								rank_level, 
								ut, 
								kr, 
								koid, 
								en, 
								op, 
								kst, 
								tpz, 
								tst)
							VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
							[id_visitor, id_rout_map, id_material, id_rank, num_shop, num_area, rm, num_operation, sm, rank_level, ut, kr, koid, en, op, kst, tpz, tst],
							(err, data= false)=>{
								const { insertId }= data;
								insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
								connection.release();
							});
					} else {
						reject( { data: this.msg.err, err : err } );
					}
				});
			})
	}
	
	editRoutMapItem(req){
		const { id, id_rout_map, id_material, id_rank, num_shop, num_area, rm, num_operation, sm, rank_level, ut, kr, koid, en, op, kst, tpz, tst }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`UPDATE ff_doc_rout_map_item
						SET
							id_visitor_update= ?, 
							id_rout_map= ?, 
							id_material= ?, 
							id_rank= ?, 
							num_shop= ?, 
							num_area= ?, 
							rm= ?, 
							num_operation= ?, 
							sm= ?, 
							rank_level= ?, 
							ut= ?, 
							kr= ?, 
							koid= ?, 
							en= ?, 
							op= ?, 
							kst= ?, 
							tpz= ?, 
							tst= ?, 
							date_update= ?
						WHERE id= ?`,
						[id_visitor, id_rout_map, id_material, id_rank, num_shop, num_area, rm, num_operation, sm, rank_level, ut, kr, koid, en, op, kst, tpz, tst, 'CURRENT_TIMESTAMP', id],
						(err, data= false)=>{
							const { affectedRows }= data;
							affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

	getRoutMapItemAll(req){
		const { id_rout_map }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_doc_rout_map_item
						WHERE id_rout_map= ?`,
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

}

module.exports= DocRoutMap;