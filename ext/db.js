const mysql = require('mysql');
const nconf= require(__APPROOT + '/config');

const db= mysql.createPool({
	connectionLimit : 100,
	charset: nconf.get('db:charset'),
	host: nconf.get('db:host'),
	user: nconf.get('db:user'),
	password: nconf.get('db:password'),
	database: nconf.get('db:database')
});

module.exports= db;