let db= require(__APPROOT + '/ext/db.js');
let nconf= require(__APPROOT + '/config');
let DocOperatingMap= require(__APPROOT + '/model/DocOperatingMap');


class DocRoutMap{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
		this.limitRous= nconf.get('db:limitRous');
	}

	addRoutMap(req){
		let { id_material, name, num_detail, weight, units_measure, type_ingot, size_d, size_w, remark, status= 0 }= req.body;
		let { id_visitor }= req.session.user;

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
								remark,
								status)
							VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
							[id_visitor, id_material, name, num_detail, weight, units_measure, type_ingot, size_d, size_w, remark, status],
							(err, data= false)=>{
								let { insertId }= data;
								insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
								connection.release();
							});
					} else {
						reject( { data: this.msg.err, err : err } );
						connection.release();
					}
				});
			})
	}

	editRoutMap(req){
		let { id, id_material, name, num_detail, weight, units_measure, type_ingot, size_d, size_w, approve_1= '{}', approve_2= '{}', approve_3= '{}', approve_4= '{}', approve_5= '{}', approve_6= '{}', approve_7= '{}', approve_8= '{}', remark, status= 0, del= 0 }= req.body;
		let { id_visitor }= req.session.user;
		
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
							date_update= CURRENT_TIMESTAMP,
							remark= ?, 
							status= ?, 
							del= ?
						WHERE id= ?`,
						[id_visitor, id_material, name, num_detail, weight, units_measure, type_ingot, size_d, size_w, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8, remark, status, del, id],
						(err, data= false)=>{
							let { affectedRows }= data;
							affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
					connection.release();
				}
			});
		});
	}

	getRoutMapById(req){
		let { id }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_doc_rout_map
						WHERE id= ? AND del= 0`,
						[id],
						(err, data)=>{
							data ? resolve(data[0]) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
					connection.release();
				}
			});
		});
	}

	getRoutMapRecent(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*,
							DATE_FORMAT(date_create, '%d.%m.%Y') as date_create
						FROM ff_doc_rout_map
						WHERE del= 0
						ORDER BY date_create DESC
						LIMIT 0, ${this.limitRous}`,
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
					connection.release();
				}
			});
		});
	}

	getRoutMapSearch(req){
		let { name, num_detail, date_create }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*,
							DATE_FORMAT(date_create, '%d.%m.%Y') as date_create
						FROM ff_doc_rout_map
						WHERE num_detail = ? OR name REGEXP ? AND del = 0 AND date_create >= ?
						ORDER BY name LIKE ? DESC, name ASC, date_create DESC
						LIMIT 0, ${this.limitRous}`,
						[num_detail, `^${name}`, date_create, name],
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
					connection.release();
				}
			});
		});
	}


	addRoutMapItem(req){
		let { id_rout_map, id_rank, id_operation, num_shop, num_area, rm, num_operation, sm, rank_level, ut, kr, koid, en, op, kst, tpz, tst }= req.body;
		let { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.beginTransaction((err)=> {
						if(!err){
							// Добавить операцию в маршрутную карту
							connection.query(`INSERT
								INTO ff_doc_rout_map_item
									(id_visitor_create, 
									id_rout_map, 
									id_rank, 
									id_operation, 
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
								[id_visitor, id_rout_map, id_rank, id_operation, num_shop, num_area, rm, num_operation, sm, rank_level, ut, kr, koid, en, op, kst, tpz, tst],
								(err, data= false)=>{
									let { insertId: id_rout_map_item }= data;
									// Добавить операционную карту
									if(!err){
										connection.query(`INSERT
											INTO ff_doc_operating_map
												(id_visitor_create, 
												id_rout_map_item)
											VALUE(?, ?)`,
										[id_visitor, id_rout_map_item],
										(err, data= false)=>{
											if(!err){
												let { insertId }= data;
												connection.commit((err)=> {
													if(!err){
														resolve(Object.assign( {}, this.msg.add, { id : insertId } ));
														connection.release();
													} else {
														return connection.rollback(()=> {
															reject({ data: this.msg.err, err : err });
															connection.release();
														});
													}
												});
											} else {
												return connection.rollback(()=> {
													// error
													reject({ data: this.msg.err, err : err });
													connection.release();
												});
											}
										});
									} else {
										return connection.rollback(()=> {
											reject({ data: this.msg.err, err : err });
											connection.release();
										});
									}

								});
						} else {
							return connection.rollback(()=> {
								reject({ data: this.msg.err, err : err });
								connection.release();
							});
						}
					});
				}else{
					reject({ data: this.msg.err, err : err });
					connection.release();
				}
			});
		})
	}

/*

	addRoutMapItem(req){
		let { id_rout_map, id_material, id_rank, id_operation, num_shop, num_area, rm, num_operation, sm, rank_level, ut, kr, koid, en, op, kst, tpz, tst }= req.body;
		let { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
				this.db.getConnection((err, connection)=>{

					
					if(!err){
						connection.query(`INSERT
							INTO ff_doc_rout_map_item
								(id_visitor_create, 
								id_rout_map, 
								id_rank, 
								id_operation, 
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
							[id_visitor, id_rout_map, id_rank, id_operation, num_shop, num_area, rm, num_operation, sm, rank_level, ut, kr, koid, en, op, kst, tpz, tst],
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

	editRoutMapItem(req){
		let { id, id_operation, id_rank, num_shop, num_area, rm, num_operation, sm, rank_level, ut, kr, koid, en, op, kst, tpz, tst, del }= req.body;
		let { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			for(let i= 0, l= id.length; l > i; i++){

				this.db.getConnection((err, connection)=>{
					if(!err){
						connection.query(`UPDATE ff_doc_rout_map_item
							SET
								id_visitor_update= ?, 
								id_operation= ?, 
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
								date_update= CURRENT_TIMESTAMP,
								del= ?
							WHERE id= ?`,
							[id_visitor, id_operation[i], id_rank[i], num_shop[i], num_area[i], rm[i], num_operation[i], sm[i], rank_level[i], ut[i], kr[i], koid[i], en[i], op[i], kst[i], tpz[i], tst[i], del[i] , id[i]],
							(err, data= false)=>{
								let { affectedRows }= data;
								affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
								connection.release();
							});
					} else {
						reject( { data: this.msg.err, err : err } );
						connection.release();
					}
				});

			}
		});
	}

	getRoutMapItemAll(id){

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_doc_rout_map_item
						WHERE id_rout_map= ? AND del= 0
						ORDER BY num_operation ASC, id ASC`,
						[id],
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
					connection.release();
				}
			});
		});
	}

}

module.exports= DocRoutMap;