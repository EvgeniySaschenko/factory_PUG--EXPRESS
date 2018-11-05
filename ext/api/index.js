const division= require('./division');
const docAutomatMap= require('./doc-automat-map');
const docRoutMap= require('./doc-rout-map');
const material= require('./material');
const nav= require('./nav');
const operation= require('./operation');
const tool= require('./tool');
const user= require('./user');

const API= {
	division,
	docAutomatMap,
	docRoutMap,
	material,
	nav,
	operation,
	tool,
	user,
}

module.exports= API;