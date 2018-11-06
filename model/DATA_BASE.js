const db= require(__APPROOT + '/ext/db.js');
const nconf= require(__APPROOT + '/config');

class DATA_BASE{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
		this.countRecord= nconf.get('countRecord');
	}

	/** DIVISION */

	createFieldDivision(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`ALTER TABLE 
							ff_division
						ADD 
							id INT AUTO_INCREMENT,
							PRIMARY KEY (id),
							id_visitor_create INT(11),
							id_visitor_update INT(11),
							name VARCHAR(255),
							date_create DATETIME(CURRENT_TIMESTAMP),
							date_update DATETIME,
							hide INT`,
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

module.exports= DATA_BASE;