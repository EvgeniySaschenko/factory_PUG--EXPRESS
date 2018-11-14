let db= require(__APPROOT + '/ext/db.js');
const nconf= require(__APPROOT + '/config');

class GlobalSettings{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}

	getAll(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_global_settings
						ORDER BY type ASC, priority ASC`,
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

module.exports= GlobalSettings;