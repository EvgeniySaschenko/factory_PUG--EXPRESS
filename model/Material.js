let db= require(__APPROOT + '/ext/db.js');
const nconf= require(__APPROOT + '/config');

class Material{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}

	/** MATERIAL */

	addMaterial(req){
		const { id_type, id_use, mark, standart }= req.body;
		const { id_visitor }= req.session.user;

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
										const { insertId }= data;
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
		const { id, id_type, id_use, mark, standart }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getMaterialСheckExists(id_type, id_use, mark, standart)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_material
									SET
										id_visitor_update= ?,
										id_type= ?,
										id_use= ?,
										mark= ?,
										standart= ?,
										date_update= ?
									WHERE id= ?`,
									[id_visitor, id_type, id_use, mark, standart, 'CURRENT_TIMESTAMP', id],
									(err, data= false)=>{
										const { affectedRows }= data;
										affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
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
		const { id }= req.params;

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
						WHERE m.id = ?`,
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

	getMaterialByTypeAndUse(req){
		const { id_type, id_use }= req.params;

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
						WHERE m.id_type = ? AND m.id_use = ?
						ORDER BY t.name ASC, m.id ASC`,
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

	/** MATERIAL TYPE */

	addType(req){
		const { name }= req.body;
		const { id_visitor }= req.session.user;

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
											const { insertId }= data;
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
		const { id, name }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getTypeСheckExists(name)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_material_type
									SET
										id_visitor_update= ?,
										name= ?,
										date_update= ?
									WHERE id= ?`,
									[id_visitor, name, 'CURRENT_TIMESTAMP', id],
									(err, data= false)=>{
										const { affectedRows }= data;
										affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
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

	getMaterialTypeAll(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_material_type`,
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