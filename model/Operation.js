let db= require(__APPROOT + '/ext/db.js');
let nconf= require(__APPROOT + '/config');

class Operation{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}

	/** OPERATION */

	addOperation(req){
		let { name }= req.body;
		let { id_visitor }= req.session.user;
		return new Promise((resolve, reject)=>{
			this.getOperationСheckExists(name)
				.then((data)=>{
					if( data.length === 0){
							this.db.getConnection((err, connection)=>{
								if(!err){
									connection.query(`INSERT
										INTO ff_operation
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

	editOperation(req){
		let { id, name, remark, status= 0, del= 0 }= req.body;
		let { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getOperationСheckExists(name)
				.then((data)=>{
					 if(data.length === 0 || data[0].id == id && data[0].del == 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_operation
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
	
	getOperationСheckExists(name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_operation
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

	getOperationAll(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*,
							DATE_FORMAT(date_create, '%d.%m.%Y') as date_create
						FROM ff_operation
						WHERE del = 0
						ORDER BY name ASC, id ASC`,
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

	getOperationById(req){
		let { id }= req.params;
		console.log( id )
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_operation
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
}

module.exports= Operation;