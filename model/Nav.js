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

	getBreadCrumbs(req){
		const { originalUrl }= req;
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_nav
						ORDER BY id_parent ASC, priority ASC`,
						(err, data)=>{
							const arr= originalUrl.split('/');
							let nav= [];
							let url= '';
							for(let i= 1, l= arr.length; l > i; i++){
								url+= '/' + arr[i];
								for(let j= 0, l2= data.length; l2 > j; j++){
									if(url == data[j].link){
										nav.push(data[j]);
									}
								}
							}
							if(nav.length < arr.length - 1){
								nav.push({name: false, link: originalUrl});
							}

							data ? resolve(nav) : reject( { data: this.msg.err, err : err } );
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