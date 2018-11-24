const db= require(__APPROOT + '/ext/db.js');
const nconf= require(__APPROOT + '/config');

class Equipment{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}

	/* EQUIPMENT */
	
	addEquipment(req){
		const { name, model, num }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getEquipmentСheckExists(name, model, num)
				.then((data)=>{
					if( data.length === 0){
							this.db.getConnection((err, connection)=>{
								if(!err){
									connection.query(`INSERT
										INTO ff_equipment
											(id_visitor_create,
											name, 
											model, 
											num)
										VALUE(?, ?, ?, ?)`,
										[id_visitor, name, model, num],
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

	editEquipment(req){
		const { id, name, model, num, remark, status= 0, del= 0 }= req.body;
		const { id_visitor }= req.session.user;
		
		return new Promise((resolve, reject)=>{
			this.getEquipmentСheckExists(name, model, num)
				.then((data)=>{
					 if(data.length === 0 || data[0].id == id && data[0].del == 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_equipment
									SET
										id_visitor_update= ?,
										name= ?,
										model= ?,
										num= ?,
										date_update= CURRENT_TIMESTAMP, 
										remark= ?,
										status= ?,
										del= ?
									WHERE id= ?`,
									[id_visitor, name, model, num, remark, status, del, id],
									(err, data= false)=>{
										const { affectedRows }= data;
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
	
	getEquipmentСheckExists(name, model, num){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_equipment
						WHERE 
							name = ?
						AND
							model = ?
						AND
							num = ?`,
						[name, model, num],
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

	getEquipmentById(req){
		const { id }= req.params;
		
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_equipment
						WHERE id= ? AND del= 0`,
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

	getEquipmentAll(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*,
							DATE_FORMAT(date_create, '%d.%m.%Y') as date_create
						FROM ff_equipment
						WHERE del= 0
						ORDER BY name ASC, model ASC, num ASC`,
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

module.exports= Equipment;