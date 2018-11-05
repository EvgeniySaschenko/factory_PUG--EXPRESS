let db= require(__APPROOT + '/ext/db.js');
const nconf= require(__APPROOT + '/config');

class Nav{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}

	/** NAV */

	getNavByType(req){
		const { type }= req;
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_nav
						WHERE type = ? 
						ORDER BY id_parent ASC, priority ASC`,
						[type],
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

module.exports= Nav;