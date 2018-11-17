const dateConvert= {
	dateToMySQL: (date)=>{
		let part= date.split('.');
		return `${part[2]}-${part[1]}-${part[0]}`;
	}
}

module.exports= dateConvert;