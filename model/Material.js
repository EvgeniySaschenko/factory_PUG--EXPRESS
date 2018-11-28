let db= require(__APPROOT + '/ext/db.js');
let nconf= require(__APPROOT + '/config');

class Material{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
		this.limitRous= nconf.get('db:limitRous');
	}

	/** MATERIAL */

	addMaterial(req){
		let { id_type, id_use, mark, standart }= req.body;
		let { id_visitor }= req.session.user;

			return new Promise((resolve, reject)=>{
				this.getMaterialСheckExists(id_type, id_use, mark, standart)
					.then((data)=>{
						if(data.length === 0){
							this.db.getConnection((err, connection)=>{
								if(!err){
									connection.query(`INSERT
									INTO ff_material
										(id_visitor_create, 
										id_type, 
										id_use, 
										mark, 
										standart)
									VALUE(?, ?, ?, ?, ?)`,
									[id_visitor, id_type, id_use, mark, standart],
									(err, data= false)=>{
										let { insertId }= data;
										insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
										connection.release();
									});
							} else {
								reject( { data: this.msg.err, err : err } );
							}
						});
					} else {
						resolve( this.msg.exists );
					}
				})
				.catch((err)=>{
					reject( { data: this.msg.err, err : err } );
				})
		});
	}

	editMaterial(req){
		let { id, id_type, id_use, mark, standart, remark, status= 0, del= 0 }= req.body;
		let { id_visitor }= req.session.user;
		return new Promise((resolve, reject)=>{
			this.getMaterialСheckExists(id_type, id_use, mark, standart)
				.then((data)=>{
					 if(data.length === 0 || data[0].id == id && data[0].del == 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_material
									SET
										id_visitor_update= ?,
										id_type= ?,
										id_use= ?,
										mark= ?,
										standart= ?,
										date_update= CURRENT_TIMESTAMP, 
										remark= ?,
										status= ?,
										del= ?
									WHERE id= ?`,
									[id_visitor, id_type, id_use, mark, standart, remark, status, del, id],
									(err, data= false)=>{
										let { affectedRows }= data;
										affectedRows ? resolve( !del ? this.msg.edit : this.msg.delete ) : reject( { data: this.msg.err, err : err } );
										connection.release();
									});
							} else {
								reject( { data: this.msg.err, err : err } );
							}
						});
					} else {
						resolve( data[0].del ? this.msg.delete : this.msg.exists );
					}
				})
				.catch((err)=>{
					reject( { data: this.msg.err, err : err } );
				})
		});
	}

	getMaterialСheckExists(id_type, id_use, mark, standart){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_material
						WHERE 
							id_type = ? 
						AND 
							id_use = ? 
						AND 
							mark = ? 
						AND 
							standart = ?`,
						[id_type, id_use, mark, standart],
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

	getMaterialById(req){
		let { id }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							m.*,
							t.name
						FROM ff_material m
						INNER JOIN ff_material_type t ON t.id = m.id_type
						WHERE m.id = ? AND m.del = 0 AND t.del = 0`,
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

	getMaterialSearch(req){
		let {  id_type, id_use, mark }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							m.id,
							m.id_type,
							m.id_use,
							m.mark,
							m.standart,
							m.status,
							m.remark,
							DATE_FORMAT(m.date_create, '%d.%m.%Y') as date_create,
							t.name
						FROM ff_material m
						INNER JOIN ff_material_type t ON t.id = m.id_type
						WHERE m.id_type = ? AND m.id_use = ? AND m.mark REGEXP ? AND m.del = 0 AND t.del = 0
						ORDER BY m.mark LIKE ? DESC, m.mark ASC
						LIMIT 0, ${this.limitRous}`,
						[id_type, id_use, `^${mark}`, `${mark}`],
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

	getMaterialByTypeAndUse(req){
		let { id_type, id_use }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							m.id,
							m.id_type,
							m.id_use,
							m.mark,
							m.standart,
							t.name
						FROM ff_material m
						INNER JOIN ff_material_type t ON t.id = m.id_type
						WHERE m.id_type = ? AND m.id_use = ? AND m.del = 0 AND t.del = 0
						ORDER BY t.name ASC, m.mark ASC`,
						[id_type, id_use],
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

	getMaterialByUseAll(id_use){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							m.id,
							m.id_type,
							m.id_use,
							m.mark,
							m.standart,
							t.name
						FROM ff_material m
						INNER JOIN ff_material_type t ON t.id = m.id_type
						WHERE m.id_use = ? AND m.del = 0 AND t.del = 0
						ORDER BY m.id_type ASC, t.name ASC, m.mark ASC`,
						[id_use],
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

	/** MATERIAL TYPE */

	addType(req){
		let { name }= req.body;
		let { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getTypeСheckExists(name)
				.then((data)=>{
					if( data.length === 0){
							this.db.getConnection((err, connection)=>{
								if(!err){
									connection.query(`INSERT
										INTO ff_material_type
											(id_visitor_create,
											name)
										VALUE(?, ?)`,
										[id_visitor, name],
										(err, data= false)=>{
											let { insertId }= data;
											insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
											connection.release();
										});
								} else {
									reject( { data: this.msg.err, err : err } );
								}
							});
						} else {
							resolve( this.msg.exists );
						}
					})
					.catch((err)=>{
						reject( { data: this.msg.err, err : err } );
					})
			});
		}

	editType(req){
		let { id, name, remark, status= 0, del= 0 }= req.body;
		let { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getTypeСheckExists(name)
				.then((data)=>{
					 if(data.length === 0 || data[0].id == id && data[0].del == 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_material_type
									SET
										id_visitor_update= ?,
										name= ?,
										date_update= CURRENT_TIMESTAMP, 
										remark= ?, 
										status= ?, 
										del= ?
									WHERE id= ?`,
									[id_visitor, name, remark, status, del, id],
									(err, data= false)=>{
										let { affectedRows }= data;
										affectedRows ? resolve( !del ? this.msg.edit : this.msg.delete ) : reject( { data: this.msg.err, err : err } );
										connection.release();
									});
							} else {
								reject( { data: this.msg.err, err : err } );
							}
						});
					} else {
						resolve( data[0].del ? this.msg.delete : this.msg.exists );
					}
				})
				.catch((err)=>{
					reject( { data: this.msg.err, err : err } );
				})
		});
	}
	
	getTypeСheckExists(name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_material_type
						WHERE 
							name = ?`,
						[name],
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

	getMaterialTypeById(req){
		let { id }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_material_type
						WHERE id = ? AND del = 0`,
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

	getMaterialTypeAll(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*,
							DATE_FORMAT(date_create, '%d.%m.%Y') as date_create
						FROM ff_material_type
						WHERE del = 0
						ORDER BY name ASC`,
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

module.exports= Material;