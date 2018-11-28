let User= require(__APPROOT + '/model/User');

class UserAuth extends User{
	constructor(){
		super();
	}

	addVisitor(id_user, ip, userAgent){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`INSERT 
						INTO ff_user_visitor
							(id_user,
							ip,
							user_agent)
						VALUE (?, ?, ?)`,
						[
							id_user, 
							ip, 
							userAgent
						],
						(err, data= false)=>{
							let { insertId }= data;
							insertId ? resolve(data.insertId) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

	login(req){
		let { login, pass }= req.body;

		return new Promise((resolve, reject)=>{
			this.getUserByLoginAndPass(login, pass)
			.then((data)=>{
				// Если авторизация удалась
				if( data.length > 0 ){
					let user= data[0];
					let id_user= user.id;
					let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
					let userAgent= JSON.stringify({ 
						"browser" : req.useragent.browser,
						"version" : req.useragent.version,
						"os" : req.useragent.os,
						"platform" : req.useragent.platform,
					});

					// Записываем поситетеля в БД
					this.addVisitor(id_user, ip, userAgent)
						.then((data)=>{
							Object.assign(user, {id_visitor : data});
							req.session.user= user;
							resolve(Object.assign( {}, this.msg.user.authLogin, { data : user } ));
						})
						.catch((err)=>{
							reject( { data: this.msg.err, err : err } );
						})

				} else {
					// Если авторизация не удалась
					resolve({ data: this.msg.user.authErr });
				}
			})
			.catch((err)=>{
				reject( { data: this.msg.err, err : err } );
			})
		});
	}

	exit(req){
		req.session.user= false;
		return { data: this.msg.user.authExit };
	}
}

module.exports= UserAuth;