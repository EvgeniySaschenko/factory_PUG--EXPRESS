const division= require('./division');
const nav= require('./nav');
const operation= require('./operation');
const equipment= require('./equipment');
const docOperatingMap= require('./doc-operating-map');
const docRoutMap= require('./doc-rout-map');
const material= require('./material');
const tool= require('./tool');
const user= require('./user');

const API= {
	division,
	docOperatingMap,
	docRoutMap,
	material,
	equipment,
	nav,
	operation,
	tool,
	user,
}

module.exports= API;